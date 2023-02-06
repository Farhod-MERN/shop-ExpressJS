import moment from "moment"

export default {
    ifequal(a, b, options){
       if(a == b) {
        return options.fn(this) // agar a == b funksiya davom etadi
       } 

       return options.inverse(this) // aks holda , function will cancel
    },

    getFullNameFirstElem(firstName, lastName){
        return firstName.charAt(0) + lastName.charAt(0)
    },
    getCut(elem){
        return elem.toString().slice(4, 24)
    },
    formatDate(date){
        return moment(date).format("DD MMM, YYYY")
    }

}