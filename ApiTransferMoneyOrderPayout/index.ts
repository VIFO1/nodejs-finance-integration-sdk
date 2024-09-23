import { QRTypeReva } from "./Modules/Interfaces/BodyCreateRevaOrderInterface";
import { QRTypeSeva } from "./Modules/Interfaces/BodyCreateSevaOrderInterface";
import VifoServiceFactory from "./Modules/Services/VifoServiceFactory";
async function test() {
    const a = new VifoServiceFactory('dev');

    const user = a.setTokenUser('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE0Y2U0ODYzMGJkMWY3NTAzYzhjNGQwYmNjYzUxMGI3NzUyMTg2NGI2MDk4ZDMyNmE0NjdkNzIyZjE5ZDEzMzU1NzVhZjdhN2VjYmE0MTlmIn0.eyJhdWQiOiI4IiwianRpIjoiMTRjZTQ4NjMwYmQxZjc1MDNjOGM0ZDBiY2NjNTEwYjc3NTIxODY0YjYwOThkMzI2YTQ2N2Q3MjJmMTlkMTMzNTU3NWFmN2E3ZWNiYTQxOWYiLCJpYXQiOjE3MjcwODI1MjIsIm5iZiI6MTcyNzA4MjUyMiwiZXhwIjoxNzU4NjE4NTIyLCJzdWIiOiIxNjEyNiIsInNjb3BlcyI6W119.aXcZN4-KgZJQyzZdkjOJnXgwCe3V5yAUMzOMBSqR0LOG7XJMDe27uUYanFDY__hq1UwAMdn7Gio-LpiG86h33f5dmxwxtzGgwTEnPCteEQgjc9-YDdx2bnGIRlX6nbG6r3WQXaWsCl4Kn5J5DzIaWLGhWqfYr5SF49O0uFX2H-R3NOgRCuU8Dt753a9a8nK65jCdEcKPuI9tanD21qxrpFHRbkIYCOyV5LsUVcdmWqyjEaWpJGP2muuVtpgfrfagfbgNFKrttMPMSQYYZLVrxFwLp32Kcd66UjGutFFvyAVl28IvwwX3Yj4QIkzrJLu6bKKDxekbyRQjD7NasHUNLYfmEAEkJ5SPATmJ5mfIHt7QhkXSY5aC75y505MI7gK4jngx6s5yZZd268LBRoriQCgYdZAknoH-kKm2yr4fK8zksJMNlEGMU1DAiU66rPN1ToRRs_lzqFeiDigkutnO5Fb1q7ayCUstSnBFAnnlUGtnbrvvPzsaehbHadypr3NzjntlsIga1yT4Dh63o7kNnGzSGZqZiZUe8YEJowoJm10OrQwXHLIZoW_VqvJpiYurPTRlnRwO1j5rAK7EM-FUapRf4aIPWSgsUBmxY2BYVxJYLxS4wb6e-Dnf8tNC_aqoZnt32O43cqq64rZvoMDdPMIWcZM5clXTVBLAx1gws8g');

    const seva = await a.createSevaOrder(
        'Dai Vu',
        '970406',
        '0214599002',
       'SEVAVF240101',
       'XXXXXXX226',
       '0972640911',
       '',
       '',
       5000,
       'remark test',
       false,
       QRTypeSeva.QR_RAW,
       ''
    )
    console.log(seva);
    
}
test();