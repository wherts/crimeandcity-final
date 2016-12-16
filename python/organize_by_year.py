import sys
import csv
from collections import defaultdict
import json
#years
validYears = ["2000", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2019", "2020", "2021"]

def organizeDataByYear(years, reader):
    tracts = None
    for row in reader:
        if tracts is None: #set tracts to be the first row (skip first label aka variable)
            tracts = [item.split(',')[0] for item in row[1:]]
        else: #actual data
            year = parseYear(row[0])
            var = parseVariable(row[0])
            data = row[1:]
            for idxTract, tract in enumerate(tracts):
                years[year][var][tract] = float(data[idxTract]) if data[idxTract] != "N/A" else data[idxTract]

def printDictionary(dictionary):
    for key, val in dictionary.items():
        print "K: {} V: {}".format(key, val)

def parseYear(datum):
    splitDatum = datum.split(',')
    return splitDatum[-1].strip()

def parseVariable(datum):
    splitDatum = datum.split(',')
    return ' '.join(splitDatum[:-1]).strip()

def writeToJson(years):
    for year, data in years.items():
        fileName = "json/" + year + ".json"
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
            years[year] = defaultdict(defaultdict)

        housing = None
        with open(sys.argv[1], "r") as housingFile:
            housing = csv.reader(housingFile)
            organizeDataByYear(years, housing)

        income = None
        with open(sys.argv[2], "r") as incomeFile:
            income = csv.reader(incomeFile)
            organizeDataByYear(years, income)

        population = None
        with open(sys.argv[3], "r") as populationFile:
            population = csv.reader(populationFile)
            organizeDataByYear(years, population)

        writeToJson(years)
