import sys
import csv
from collections import defaultdict
from operator import itemgetter
import json

validTracts = ["187200","197200","197420","197300","197410","195720","197500","197600","197700","980010","187300"]

def organizeDataByTract(tracts, reader, type):
    rowCount = 0
    for row in reader:
        if rowCount == 0: #skip first row
            rowCount = 1
        else:
            variable = parseVariable(row[0])
            year = parseYear(row[0])
            data = row[1:]
            vals = []
            for idxTract, tID in enumerate(validTracts):
                d = int(data[idxTract]) if data[idxTract] != "N/A" else 0
                tracts[tID][variable].append((year, d))
                #make tuple of year, val then sort by year then parse out value

    for tID, valDict in tracts.items():
        for variable, values in valDict.items():
            # if variable == "American Indian and Alaska Native Population":
            #     values.insert(0, ("2009", 0))
            #     values.insert(0, ("2008", 0))
            #     values.insert(0, ("2000", 0))
            values.sort(key=itemgetter(0))
            tracts[tID][variable] = [item[1] for item in values]

    # for tID, valDict in tracts.items():
        # for variable, values in valDict.items():
    return tracts

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

def writeToJson(tracts, postfix):
    for tID, data in tracts.items():
        fileName = "json/" + tID + postfix + ".json"
        with open(fileName, "w") as jsonFile:
            jsonObj = json.dumps(data, sort_keys=True, indent=4, separators=(',', ': '))
            jsonFile.write(jsonObj)

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print "Error: wrong number of input files"
        sys.exit()
    else:
        tracts = {}
        for t in validTracts:
            tracts[t] = defaultdict(list)

        population = None
        with open(sys.argv[3], "r") as populationFile:
            population = csv.reader(populationFile)
            popData = organizeDataByTract(tracts, population, 2)
            writeToJson(popData, "-population")

        tracts = {}
        for t in validTracts:
            tracts[t] = defaultdict(list)

        income = None
        with open(sys.argv[2], "r") as incomeFile:
            income = csv.reader(incomeFile)
            incData = organizeDataByTract(tracts, income, 0)
            writeToJson(incData, "-income")

        tracts = {}
        for t in validTracts:
            tracts[t] = defaultdict(list)
        housing = None
        with open(sys.argv[1], "r") as housingFile:
            housing = csv.reader(housingFile)
            houseData = organizeDataByTract(tracts, housing, 1)
            writeToJson(houseData, "-housing")
