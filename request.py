import requests

url = 'http://localhost:3000/createUser'
myobj = {
  'nick': 'lucas1',
  'password': "batata"
}

x = requests.post(url, json = myobj)

print(x.text)
