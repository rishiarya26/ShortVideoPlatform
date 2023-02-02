const SECRET = {
    prod: "gBQaZLiNdGN9UsCKZaloghz9t9StWLSD",
    preprod: "gBQaZLiNdGN9UsCKZaloghz9t9StWLSD",
    dev: "PLtzvROAYFmMfHjOPuvfrEfUc6PQGNVH",
}

export const getEsk = ({deviceId, env}) => {    
    console.log("debug", env, SECRET[env]);       
    return btoa(deviceId + '__' + SECRET[env] + '__' + new Date().getTime())
}