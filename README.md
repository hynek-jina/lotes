## Lotes

**Lightning notes Validator**

Lotes are bitcoin physical notes running on LNbits and Lightning Network.
The application serves as a validator for these lotes.

## Users flow

- You receive a lote and you want to be sure it’s valid
- So you open the Lotes app and click on Vefify button
- App opens nfc scanner
- You hover the mobile over the lote
- On the background bitcoin from the chip is transfered to your account, new bank note is issued and recorded on the same chip
- So you know that the lote is valid and the satoshis are safely stored on your account

_At this point, you are assured that no previous owner of the note, or anyone who may have previously scanned it, can claim the funds._

## Setup

- You will need to create an account on [LNbits](https://lnbits.com/)
  \_It is recommended to run your own instance of LNbits but If you are not ready, you can use [Demo server](https://legend.lnbits.com/)

  - Open LNbits
  - Insert name for your wallet and click on `ADD A NEW WALLET`
  - On right panel about api information click on `API info`
  - Copy your `Admin key`
  - Click on `Extensions` on left panel, find `LNURLw`, and enable it by click on `ENABLE`
  - Open Lotes app
  - Insert your `Admin key` and `server`
    You should appear at Home screen:
    ![Homescreen](https://user-images.githubusercontent.com/26002916/227718907-662bf30c-7bcd-4076-b1e6-1328d7ad8384.PNG)

## Project and bounty program

If you have an idea how to improve the app please have a look into existing issues first. Feel free to add new one if your idea is missing.

- Issues are structured according the [priority](https://github.com/users/hynek-jina/projects/2/views/2) and [development phase](https://github.com/users/hynek-jina/projects/2/views/1).
- If you want to participate, there are [some issues](https://github.com/users/hynek-jina/projects/2/views/4) with symbolic bounty in sats. Poste a comment if you are working on one of them. Btw there are non-developers issues as well.

## Donate or support specific features

- If you like the project please consider a donation. If you send me a tip and use description `#issuenumber` I will increase the bounty for that issue by your donation. So for example if you send me 1 000 sats and as a description use #25 I will increase the bounty for `Design of physical lotes` by 1 000 sats.

Donate address:
