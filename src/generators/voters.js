import { faker } from '@faker-js/faker'
export function stVotes(vnum)
{
    try{
        const voters = Array.from({ length:vnum }, ()=>({
              voterid : faker.string.uuid(),
              ideology: faker.number.int({ min: -3, max: 3 }),
              confidence: faker.number.float({ min: 0, max: 1}),
              undecided: faker.datatype.boolean(),
              turnout: faker.number.float({ min: 0, max: 1 })
             }))
        const ballots = JSON.stringify(votes)
        return ballots
        }catch(err){
        console.log(err)
        return null
    }
  
}

export default stVotes