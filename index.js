import { stVotes } from './src/generators/votes.js'
import { fptp } from './src/systems/fptp.js'

const votes = (stVotes(100, 5))
const results = fptp(votes)
const candidates = results.candidates
//reduce: reduces the array to a single value by applying a function to each element
const winner = candidates.reduce((prev, current) => (current.votes > (prev.votes || 0)? current : prev),{})
console.log(results.turnout)
console.log(results.candidates)
console.log(`Winner: ${winner.name} with ${winner.votes} votes`)
console.log(`Winner's party: ${winner.party}`)

