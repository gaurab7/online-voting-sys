
export function fptp(votes){
    try {
        const data = votes      
        if(!data || !data.ballots || !data.candidates) {
            throw new Error('Invalid data format')}
        //stVotes returns stringified ballots and parsed candidates 
        //here we get parse JSON objects 
        //properties are in votes.js
        const ballots = JSON.parse(data.ballots)
        const turnout = ballots.length
        const candidates = data.candidates
        for(let i=0; i<turnout; i++){
            //foreach iterrates through each element in the array candidates
            //and checks if the name matches the votedFor property in the ballot
              candidates.forEach(el =>{
                if(el.name === ballots[i].votedFor[0]){
                    //candidates objects do no have a votes property 
                    //here we are adding a votes property and as its a new property we nee to heve an initial ccndtion as votes is undefined
                    //so we set it to 0 and then add 1 to it
                    //in succeding iterations, the votes property will have a value so vote counts will be logged 
                    el.votes = (el.votes || 0) + 1
                    //previously used candidates[i].votes = (candidates[i].votes || 0) + 1 
                    //that doesnot work as it will add votes property to the candidates array as a whole, meaning votes=turnout
                    //and not to the elements of the array separately for each matching candidate
                }   
              })
            }
        return { candidates, turnout }
        }catch(err){
            console.log(err)
            return null
        }

}

export default fptp 