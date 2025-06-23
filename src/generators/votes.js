import { faker } from '@faker-js/faker'
import { fptpCandidates } from './candidates.js'

export function stVotes(vnum, cnum)
{
    try{
        const candidates = JSON.parse(fptpCandidates(cnum))
        if(!candidates || candidates.length === 0) {
            throw new Error('No candidates')
        }
        //returns array of candidate names only not other properties
        const candidateNames = candidates.map(c=> c.name)
        const votes = Array.from({ length:vnum }, ()=>({
              voterid : faker.string.uuid(),
              //might want to add voter behaviors later on(age groups, location, religion, gender, etc)
              votedFor: faker.helpers.shuffle(candidateNames)//randomly select a candidate name 
             }))
        return JSON.stringify(votes)
    }catch(err){
        console.log(err)
        return null
    }
  
}

export default { fptpVotes }