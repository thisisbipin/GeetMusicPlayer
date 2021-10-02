import os


list = os.listdir(os.curdir + '/public/musics/')
# list = os.listdir('/media/bipin/Dragonite/Music/EDM/')
print(list) 
f = open(os.curdir + '/public/lists.txt', "w")
list.sort()
for song in list:
    if song[-4:] == '.mp3':
        f.write(song[:-4] + '\n')
f.close()
