# Focibase

Az alábbiakban a javítás szempontjából releváns információkat rögzítem.

## Adatmodellek

file-ok:

- player.ts, match.ts, stadium.ts, team.ts

felhasználásuk kollekciókkal:

- data.service.ts: 88, 92, 96, 100

## Attribútum direktívák

fajták:

- routerLink, value (+ matMenuTriggerFor, matDatepicker)

helyük:

- app.component.html: 3, match.container.component.html: 13

## Strukturális direktívák

fajták:

- ngIf, ngFor

helyük:

- app.component.html: 18, match-container.component.html: 13

## Input, Output szülő és gyerek között

- match-container.component.ts 39, 48

## Material elemek

fajták:

- mat-icon, mat-button, mat-card, mat-toolbar, mat-menu, mat-formField, mat-label, mat-divider, mat-hint, mat-list, mat-select

helyük:

- app.component.html, teams-stadiums.component.html, players.component.html

## Angular formok

- signup.component.ts, login.component.ts

illetve ezek html template-jeiben (signup.component.html, login.component.html)

## Saját pipe

- player-pipe.ts

felhasználva:

- players.component.html:3

## Lifecicyle hookok:

Subjectre fel- és leiratkozásra:

- OnInit, OnDestroy

helyük:

- matches.component.ts: 36, 42

players.component-ben, teams-stadiums.component-ben szintén

## CRUD műveletek

matches kollekció elemein teljes CRUD, többin csak create, read

- data.service.ts: 79, 99, 103, 107

## Firestore, körnezeti változók

Környezeti változók:

- environment.ts

Firestore használata:

- data.service.ts

## Komplex lekérdezések

where, order by

- data.service.ts: 88, 96

## Routing 

- app.routes.ts

## AuthGuards

- auth.guardts

felhaszálva:

- app.routes.ts