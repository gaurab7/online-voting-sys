import { Candidates } from './candidates.js'
import {stVotes} from './voters.js'

export function asignVotes(cnum, vnum) {
    try{
        const candidates = JSON.parse(Candidates(cnum))
        if(!candidates || candidates.length === 0) {
            throw new Error('No candidates')
        }
        const voters = JSON.parse(stVotes(vnum))
        if(!voters || voters.length === 0) {
            throw new Error('No voters')
        }
        //assign votes to candidates
        voters.forEach(element => {
            if(element.turnout < 0.3){
                return//skip this voter
            }
            else if(element.turnout >= 0.3 && element.turnout < 0.6){
                if(element.undecided && element.confidence < 0.5) {
                   switch(element.ideology) {
                        case -3:
                            element.votedFor = candidates.reduce
                            break;
                        case -2:
                            element.votedFor = [candidates[1].name] //left-center
                            break;
                        case -1:
                            element.votedFor = [candidates[2].name] //center
                            break;
                        case 0:
                            element.votedFor = [candidates[3].name] //right-center
                            break;
                        case 1:
                            element.votedFor = [candidates[4].name] //right
                            break;
                        default:
                            element.votedFor = [candidates[5].name] //independent
                    }
                   
                }
            }
        })
       
    }catch(err){
        console.log(err)
        return null
    }
}










  
