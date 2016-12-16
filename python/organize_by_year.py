import sys
import csv
from collections import defaultdict
from operator import itemgetter
import json
#years
validYears = ["2000", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2019", "2020", "2021"]

def organizeDataByYear(years, reader, t):
    tracts = None
    for row in reader:
        if tracts is None: #set tracts to be the first row (skip first label aka variable)
            tracts = [item.split(',')[0] for item in row[1:]]
        else: #actual data
            year = parseYear(row[0])
            var = parseVariable(row[0])
            data = row[1:]
            d = defaultdict(int)
            for idxTract, tract in enumerate(tracts):
                d[tract] = int(data[idxTract]) if data[idxTract] != "N/A" else data[idxTract]
            years[year].append([var, d])

    keySort = itemgetter(0)
    if t == 0: #special sorting for income
        keySort = incomeSort
    elif t == 1: #or housing
        keySort = housingSort
    for year, vals in years.items():
        sortedVals = sorted(vals, key=keySort)
        if t < 2:
            sortedVals.insert(0, sortedVals.pop())
        years[year] = sortedVals

    return years

def incomeSort(item):
    val = item[0].split()[3]
    if val == "less":
        return val
    else:
        return int(val[1:])

def housingSort(item):
    val = item[0].split()
    if len(val) > 4:
        val = val[3]
        if val == "less":
            return val
        else:
            return int(val[1:])
    else:
        return item


def printDictionary(dictionary):
    for key, val in dictionary.items():
        print "K: {} V: {}".format(key, val)

def parseYear(datum):
    splitDatum = datum.split(',')
    return splitDatum[-1].strip()

def parseVariable(datum):
    splitDatum = datum.split(',')
    variable = ' '.join(splitDatum[:-1]).strip()
    if variable[0] == "#": #remove pound sign, counts are self explanatory
        variable = variable[2:]
    return variable

def writeToJson(years, postfix):
    for year, data in years.items():
        fileName = "json/" + year + postfix + ".json"
        with open(fileName, "w") as jsonFile:
            jsonObj = json.dumps(data, sort_keys=True, indent=4, separators=(',', ': '))
            jsonFile.write(jsonObj)

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print "Error: wrong number of input files"
        sys.exit()
    else:
        years = {}
        for year in validYears: #init main storage dict
            # years[year] = defaultdict(defaultdict)
            years[year] = []

        population = None
        with open(sys.argv[3], "r") as populationFile:
            population = csv.reader(populationFile)
            popData = organizeDataByYear(defaultdict(list), population, 2)
            writeToJson(popData, "-population")

        income = None
        with open(sys.argv[2], "r") as incomeFile:
            income = csv.reader(incomeFile)
            incData = organizeDataByYear(defaultdict(list), income, 0)
            writeToJson(incData, "-income")

        housing = None
        with open(sys.argv[1], "r") as housingFile:
            housing = csv.reader(housingFile)
            houseData = organizeDataByYear(defaultdict(list), housing, 1)
            writeToJson(houseData, "-housing")
