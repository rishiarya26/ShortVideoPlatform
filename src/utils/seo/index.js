export const customProfileTitleSeo = ({item})=>{
    if(!item?.userHandle) {
        return `${item?.firstName || ''} ${item?.lastName || ''}(${item?.userHandle || ''}) on Hipi | ${item?.firstName || ''} ${item?.lastName || ''} on Hipi `;
    }
    const userHandle = item.userHandle.replace("@", "");
    switch (userHandle) {
        case 'Sneha_pundir_': return 'Hipi Stunner Winner - Sneha Pundir(@Sneha_pundir_) on Hipi'

        case 'Pitchers' : return 'TVF Pitchers on Hipi |Pitchers Season 2 | Tu Beer Hai | All Episodes'

        default: return `${item?.firstName || ''} ${item?.lastName || ''}(${item?.userHandle || ''}) on Hipi | ${item?.firstName || ''} ${item?.lastName || ''} on Hipi `
    }
}

export const customHashtagTitleSeo = ({item})=>{
    switch (item) {
        case 'gay' : return 'Indian Gay Video on Hipi | #Gay Videos Hashtag | Hipi'
        
        case 'hd' : return'Indian HD Video On Hipi | #HD Videos Hashtag | Hipi'
        
        case 'aunty' : return 'Indian Aunty Videos On Hipi | #Aunty Videos Hashtag | Hipi'
        
        case 'badi' : return'Video Badi On Hipi | #Badi Videos Hashtag | Hipi'
        
        case 'gtav' : return'Gta V Videos On Hipi | #Gtav Videos Hashtag | Hipi'
        
        case 'saxena' : return'Saxena Video On Hipi | #Saxena Videos Hashtag | Hipi'
        
        case 'fifa' : return'Fifa Video On Hipi | #Fifa Videos Hashtag | Hipi'
        
        case 'shaadi' : return'Shaadi Video On Hipi | #Shaadi Videos Hashtag | Hipi'
        
        case 'sab' : return'Sab Video On Hipi | #Sab Videos Hashtag | Hipi'

        case 'PitchersOnHipi' : return'TVF Pitchers on Hipi | Watch Pitchers season 2 | Jeetu'

        case 'pitchers' : return'TVF Pitchers Season 2 On Hipi | Tu Beer Hai TVF | Naveen | Jeetu'

        default : return`Find Latest Videos on Hipi | Hashtag ${item} |Trending Videos`
    }
}

export const customProfileDescSeo = ({item}) => {
    if(!item?.userHandle) {
        return`${item?.firstName || ''} ${item?.lastName || ''}(${item?.userHandle || ''}) on Hipi. ${item?.followers || ''} followers, Check out latest trending videos from ${item?.firstName || ''} ${item?.lastName || ''} on Hipi. Download the App Now!`
    }
    const userHandle = item.userHandle.replace("@", "");
    switch(userHandle) {
        case 'Pitchers' : return `Watch Pitchers Season 2 | TVF Pitchers on Hipi | TVF Pitchers New Season on Hipi | Tu Beer Hai | Naveen | Arunabh Kumar | Jeetu | Jury Room`

        default : return`${item?.firstName || ''} ${item?.lastName || ''}(${item?.userHandle || ''}) on Hipi. ${item?.followers || ''} followers, Check out latest trending videos from ${item?.firstName || ''} ${item?.lastName || ''} on Hipi. Download the App Now!`
    }
}

export const customHashtagDescSeo = ({item}) => {
    switch(item) {
        case 'PitchersOnHipi' : return `Watch TVF Pitchers Mini Episodes Now on Hipi | TVF Pitchers Season 2 All Episodes | Pitchers Season 1 | Tu Beer Hai | Jury Room | Bulb jalega | Where Magic Happens`

        case 'pitchers' : return `Watch TVF Pitchers All Episodes on Hipi | Pitchers Season 2 | TVF Pitchers Season 1 | Tu Beer Hai | Jury Room | Jeetu | Mandal | Naveen | Arunabh Kumar TVF Pitchers New Season`

        default : return `Explore all the latest videos on Hipi by #${item}, hashtag are a brilliant way to group up posts and find latest video trends. Also, find the influencers daily content`
    }
}