## Lotes

**Issue and Claim physical lightning notes**

Lotes are bitcoin physical notes running on LNbits and Lightning Network. <br>

## Users flow

- Paste url of your LNbits wallet or generate new one with one click on `New User`
- Click on `Issue Lote` button
- Specified amount of sats
- Reccord this Lote (LNURLw) to physical NFC chip (NTAG216)

- Receiver opens his app
- Hit `Claim Lote` 
- Scan received Lote (NFC card)
- Sats will arrive to his LNbits wallet


## Download

- [Join TestFlight to test app on iOS](https://testflight.apple.com/join/92K4nHPd)


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

## Run the app as a developer

1. Clone this repository
2. Run `yarn install`
3. Run `npx expo prebuild`
4. run `npx expo run:ios` or `npx expo run:android`
