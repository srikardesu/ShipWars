# Ship Wars!

This is a 3D game where the player has to collect as many treasure chests as possible while also avoiding the battle ships that constantly appear and shoot at them. There is also a time limit for the same, so be sure to keep an eye on the ticking clock!  

## Introduction

This game has been built using Three JS.

There are 3 main entities in this game, as follows:

### 1. Player Ship

The Player ship as the name suggests is a ship under our control. The normal WASD Movements are supported. It can also shoot the enemy Battleships that spawn in the way. The main objective of the Player ship is to collect as many treasure chests as possible while also dodging the bullets from the battle ships.

### 2. Battle Ship

The Battle Ship is the enemy ship. They are randomly spawned around the Player Ship and shoot at certain intervals towards the Player ship with some probability. The main purpose of the Battle ships is to reduce the health of the Player Ship and slow it down. 

### 3. Treasure Chests

Treasure Chests are the scoring entities for the players. These are star shaped structures available around the whole map. These are again spawned randomly at a distance from the player ship at equal intervals. 

## Controls

Up key → Move forward

Down key → Move Backward

Right key → Rotate Right

Left Key → Rotate Left

T → Birds Eye View

O → Normal View

Space → To Shoot Cannon Balls  

## Setup

1. clone the repository.
2. cd into the repository.
3. run the command 

<aside>
💡 npm i http-server

</aside>

1. Start the server using

<aside>
💡 http-server

</aside>

1. run the game at [http://localhost:8080/](http://localhost:8080/) .