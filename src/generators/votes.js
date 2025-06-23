import { faker } from '@faker-js/faker'
import { Candidates } from './candidates.js'

export function stVotes(vnum, cnum)
{
    try{
        const candidates = JSON.parse(Candidates(cnum))
        if(!candidates || candidates.length === 0) {
            throw new Error('No candidates')
        }
        //returns array of candidate names only not other properties
        const candidateNames = candidates.map(el=> el.name)
        const votes = Array.from({ length:vnum }, ()=>({
              voterid : faker.string.uuid(),
              //might want to add voter behaviors later on(age groups, location, religion, gender, etc)
              votedFor: faker.helpers.shuffle(candidateNames)//randomly select a candidate name 
             }))
        const ballots = JSON.stringify(votes)
        //both ballots and candidates are returned as JSON strings so only need to parse later
        return { ballots, candidates }
    }catch(err){
        console.log(err)
        return null
    }
  
}

export default stVotes