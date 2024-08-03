import { currentVotes } from "@prisma/client";


const countVotes = (votes:currentVotes[])=>{
    const counts:any = {};

    votes.forEach(vote=>{
        if(Object.keys(counts).includes(vote.voteOptionsId)){
            counts[vote.voteOptionsId].push(vote);
        }else{
            counts[vote.voteOptionsId]=[];
            counts[vote.voteOptionsId].push(vote);
        }

    })

    let highest = "";
    
    Object.keys(counts).forEach((c)=>{
        if(!highest){
            highest = counts[c][0].voteOptionsId
            return 
        }

        if(counts[c].length > counts[highest].length){
            highest = counts[c][0].voteOptionsId
        }
    })
    return highest
}
export default countVotes