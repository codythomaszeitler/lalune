class Name {

    constructor(firstName, lastName, middleName=null) {
        this.firstName = firstName; 
        this.lastName = lastName; 
        this.middleName = middleName; 
    }

    getFirstName() {
        return this.firstName;
    }

    getMiddleName() {
        return this.middleName;
    }

    getLastName() {
        return this.lastName;
    }

    equals(object) {
        if (object === null) {
            return false;
        }

        let firstNameEquivalent = this.firstName === object.firstName;
        let lastNameEquivalent = this.lastName === object.lastName;
        let middleNameEquivalent = this.middleName === object.middleName;

        let isEquals = firstNameEquivalent && lastNameEquivalent && middleNameEquivalent;
        return isEquals;
    }
};

module.exports = {
    Name : Name
};