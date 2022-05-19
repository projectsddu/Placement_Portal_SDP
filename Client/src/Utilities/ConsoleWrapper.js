const clg = (text) => {
    if (process.env.NODE_ENV != "production")
        console.log(text)
}

export default clg