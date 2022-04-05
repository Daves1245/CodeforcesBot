function toDate(seconds) {
    return {
        "days": Math.floor(seconds / (60 * 60 * 24)),
        "hours": Math.floor((seconds % (60 * 60 * 24)) / (60 * 60)),
        "minutes": Math.floor((seconds % (60 * 60)) / 60),
        "seconds": seconds % 60
    };
}

export { toDate };
