from urllib.request import urlopen
import json
import pandas as pd
import numpy
import ftplib

def bookCheck(isbn):

    file = open("data.txt","r",encoding="utf-8")
    inputData = list()

    for sor in file:
        sor = sor.strip()
        sor = sor.split(";")
        inputData.append(sor)

    isIsbnInFile = False

    for i in range(len(inputData)):
        if(isbn in inputData[i] and isIsbnInFile == False):
            isIsbnInFile = True

    return isIsbnInFile


def bookDetails(isbn):
    base = "https://www.googleapis.com/books/v1/volumes?q=isbn:"
    url = base+isbn
    
    # store the response of URL
    response = urlopen(url)
    
    # storing the JSON response 
    # from url in data
    data_json = json.loads(response.read())

    title = ""
    category = ""
    description = ""
    authors = ""
    pageCount = ""
    publisher = ""
    img = ""

    # print the json response
    if ("items" in data_json ):
        if ("volumeInfo" in data_json["items"][0]):
            if ("title" in data_json["items"][0]["volumeInfo"]):
                title = data_json["items"][0]["volumeInfo"]["title"]
            if ("categories" in data_json["items"][0]["volumeInfo"]):
                category = data_json["items"][0]["volumeInfo"]["categories"]
            if ("description" in data_json["items"][0]["volumeInfo"]):
                description = data_json["items"][0]["volumeInfo"]["description"]
            if ("authors" in data_json["items"][0]["volumeInfo"]):
                authors = data_json["items"][0]["volumeInfo"]["authors"]
            if ("pageCount" in data_json["items"][0]["volumeInfo"]):
                pageCount = data_json["items"][0]["volumeInfo"]["pageCount"]
            if ("publisher" in data_json["items"][0]["volumeInfo"]):
                publisher = data_json["items"][0]["volumeInfo"]["publisher"]
            if ("imageLinks" in data_json["items"][0]["volumeInfo"]):
                if ("thumbnail" in data_json["items"][0]["volumeInfo"]["imageLinks"]):
                    img = data_json["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"]
                if ("smallThumbnail" in data_json["items"][0]["volumeInfo"]["imageLinks"]):
                    img = data_json["items"][0]["volumeInfo"]["imageLinks"]["smallThumbnail"]
                

    if (type(title) == list):
        if len(title) == 1:
            title = "".join(title)
        elif len(title) > 1:
            title = ",".join(title)

    if (type(description) == list):
        if (len(description) == 1):
            description = "".join(description)
        elif (len(description) > 1):
            description = ",".join(description)

    if (type(category) == list):
        if (len(category) == 1):
            category = "".join(category)
        elif (len(category) !=  1):
            category = ",".join(category)

    if (type(authors) == list):
        if len(authors) == 1:
            authors = "".join(authors)
        elif len(authors) > 1:
            authors = ",".join(authors)

    if (type(pageCount) == list):
        if len(pageCount) == 1:
            pageCount = "".join(pageCount)
        elif len(pageCount) > 1:
            pageCount = ",".join(pageCount)

    if (type(publisher) == list):
        if len(publisher) == 1:
            publisher = "".join(publisher)
        elif len(publisher) > 1:
            publisher = ",".join(publisher)

    if (type(img) == list):
        if len(img) == 1:
            img = "".join(img)
        elif len(img) > 1:
            img = ",".join(img)


    data = [f"{isbn}",f"{title}",f"{category}",f"{description}",f"{authors}",f"{pageCount}",f"{publisher}",f"{img}"]

    file = open("data.txt","a",encoding="utf-8")

    file.write(f"\n{';'.join(data)}")

    file.close()

def getISBNs():
    
    sheetID = '1Kdz28yk7Rcq_oVdHOQ9nMQ1H0CcCazlPd47nk_svwIY'
    df = pd.read_csv(f"https://docs.google.com/spreadsheets/d/{sheetID}/export?format=csv")

    return df.to_numpy()

array = getISBNs()
isbns = list()
for i in range (len(array)):
    if numpy.array_str(array[i]) not in isbns:
        isbns.append((f"{numpy.array_str(array[i])}")[1:-1])

for i in range(len(isbns)):
   if(bookCheck(isbns[i]) == False):
       isbn = isbns[i]
       bookDetails(isbn)

hotsname = "kellsosserver.duckdns.org"
username = "ftpuser"
password = "982467"

ftp_server = ftplib.FTP(hotsname, username, password)
ftp_server.encoding = "utf-8"
ftp_server.cwd('home')
ftp_server.cwd('marko')
ftp_server.cwd('ServerFile')


with open("data.txt", "rb") as file:
    # Command for Uploading the file "STOR filename"
    ftp_server.delete("data.txt")
    ftp_server.storbinary(f"STOR {f'data.txt'}", file)

# Get list of files

 
# Close the Connection
ftp_server.quit()