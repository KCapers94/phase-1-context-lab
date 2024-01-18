/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
function createEmployeeRecord (employeeArray) {
return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title:employeeArray[2],
    payPerHour:employeeArray[3],
    timeInEvents:[],
    timeOutEvents:[],
}

}

function createEmployeeRecords (arrayOfArrays) {
    let arrayOfObjects = [];
    arrayOfArrays.forEach((element) => arrayOfObjects.push(createEmployeeRecord(element)));
    return arrayOfObjects
}

function createTimeInEvent (dateStamp) {
    let timeInEventsObject = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0],
    }
    this['timeInEvents'].push(timeInEventsObject)
    return this
}

function createTimeOutEvent (dateStamp) {
    let timeOutEventsObject = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0],
    }
    this['timeOutEvents'].push(timeOutEventsObject)
    return this
}

function hoursWorkedOnDate (dateOfTheForm) {
    let timeInObject = this['timeInEvents'].find((element) => dateOfTheForm === element ['date'])
    let timeOutObject = this['timeOutEvents'].find((element) => dateOfTheForm === element ['date'])
    return (timeOutObject['hour'] - timeInObject['hour']) / 100
}

function wagesEarnedOnDate (dateOfTheForm) {
    console.log(this)
    let wagesEarnedObject = this['payPerHour']
    return wagesEarnedObject * hoursWorkedOnDate.call(this,dateOfTheForm)
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName (collection, firstNameString) {
    const findsFirstName = collection.find((element) => firstNameString === element['firstName'])
    return findsFirstName
}

function calculatePayroll (employeeRecords) {
    let payrollAllEmployees = employeeRecords.reduce((acc, employeeRecords) => acc + allWagesFor.call(employeeRecords),0)
    return payrollAllEmployees
}

