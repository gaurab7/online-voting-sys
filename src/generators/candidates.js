import { faker } from '@faker-js/faker'

export function Candidates(num)
{
    try{
        const parties = ['Democrat','Republican','Independent']
        const candidates = Array.from({ length: num }, () => ({
             id: faker.string.uuid(),
             name: faker.person.fullName(),
             age: faker.number.int({ min: 30, max: 70 }),
             party: faker.helpers.arrayElement(parties),
             constituency: faker.location.city(),
             pop_index: faker.number.int({ min: 1, max: 10 }),
             ideology: faker.number.int({ min: -3, max: 3 })
             }))
         return JSON.stringify(candidates)
    }catch(err){
        console.log(err)
        return null
    }
}