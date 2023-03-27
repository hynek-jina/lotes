## Lotes

**Lightning notes Validator**

Lotes are bitcoin physical notes running on LNbits and Lightning Network. <br>
The application serves as a validator for these lotes.

**Proof of concept video:** <br>
[![Lotes app - proof of concept](https://i9.ytimg.com/vi_webp/_cQutic0CX0/mq2.webp?sqp=CLC5hqEG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgUShIMA8=&rs=AOn4CLAq53lG9oddARa3klEu_J3FDoEv_g)](https://youtu.be/_cQutic0CX0)

## Users flow

- You receive a lote and you want to be sure it’s valid
- So you open the Lotes app and click on Vefify button
- App opens nfc scanner
- You hover the mobile over the lote
- On the background bitcoin from the chip is transfered to your account, new bank note is issued and recorded on the same chip
- So you know that the lote is valid and the satoshis are safely stored on your account

_At this point, you are assured that no previous owner of the note, or anyone who may have previously scanned it, can claim the funds._

## Setup

- You will need to create an account on [LNbits](https://lnbits.com/) <br>
  _It is recommended to run your own instance of LNbits but If you are not ready, you can use [Demo server](https://legend.lnbits.com/)_

| Open LNbits | |
| --- | --- |
 | Insert name for your wallet and click on `ADD A NEW WALLET` | <img width="306" alt="Snímek obrazovky 2023-03-25 v 18 20 14" src="https://user-images.githubusercontent.com/26002916/227732136-44a1fc22-b356-430b-b2be-2e313e4cc98e.png"> |
| On right panel about api information click on `API info` and copy your `Admin key` | <img width="434" alt="Snímek obrazovky 2023-03-25 v 18 21 12" src="https://user-images.githubusercontent.com/26002916/227732213-ab1159f8-eb21-40eb-9ba9-69d6d60bf8e3.png"> |
| Click on `Extensions` on left panel, find `LNURLw`, and enable it by click on `ENABLE`| <img width="350" alt="Snímek obrazovky 2023-03-25 v 18 20 49" src="https://user-images.githubusercontent.com/26002916/227732266-75561ad5-87ce-403f-b2c4-afbb4b0f2452.png"> |
| Open Lotes app | |
| Insert your `Admin key` and `server` | <img src="https://user-images.githubusercontent.com/26002916/227718908-3675e2ff-9614-459d-ad19-8d93bdd24b28.PNG" width="60%" height="60%"> |
| Click on `Save settings` | |
| You should appear at Home screen | <img src="https://user-images.githubusercontent.com/26002916/227718907-662bf30c-7bcd-4076-b1e6-1328d7ad8384.PNG" width="60%" height="60%"> |


## Project and bounty program

If you have an idea how to improve the app please have a look into existing issues first. Feel free to add new one if your idea is missing.

- Issues are structured according the [priority](https://github.com/users/hynek-jina/projects/2/views/2) and [development phase](https://github.com/users/hynek-jina/projects/2/views/1).
- If you want to participate, there are [some issues](https://github.com/users/hynek-jina/projects/2/views/4) with symbolic bounty in sats. Poste a comment if you are working on one of them. Btw there are non-developers issues as well.

## Donate or support specific features

- If you like the project please consider a donation. If you send me a tip and use description `#issuenumber` I will increase the bounty for that issue by your donation. So for example if you send me 1 000 sats and as a description use #25 I will increase the bounty for [Design of physical lotes](https://github.com/hynek-jina/lotes/issues/25) by 1 000 sats.

Donate address:

![QR Code](https://user-images.githubusercontent.com/26002916/227731711-d6614a10-8bb7-44a8-b152-fe57418b9181.png)
```
lnurl1dp68gurn8ghj7ampd3kx2ar0veekzar0wd5xjtnrdakj7tnhv4kxctttdehhwm30d3h82unvwqhhxur9v4j8jumtd95kuee4xqqp6h25
```
