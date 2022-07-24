export default (err) => {
    if (err.status === 500) {
        return "Internal ERROR 500!"
    }

    const mess = err.data.message
    if (mess?.length > 0) {
        return mess.join(", ")
    } else {
        return mess
    }
}