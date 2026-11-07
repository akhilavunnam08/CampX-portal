import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import FIRST_NAME from '@salesforce/schema/Student__c.First_Name__c';
import LAST_NAME from '@salesforce/schema/Student__c.Last_Name__c';
import ROLL_NUMBER from '@salesforce/schema/Student__c.Roll_Number__c';
import DEPARTMENT from '@salesforce/schema/Student__c.Department__c';
import SEMESTER from '@salesforce/schema/Student__c.Current_Semester__c';
import EMAIL from '@salesforce/schema/Student__c.Email__c';
import STATUS from '@salesforce/schema/Student__c.Status__c';
import CGPA from '@salesforce/schema/Student__c.CGPA__c';
import ATTENDANCE from '@salesforce/schema/Student__c.Overall_Attendance__c';
import FEE_DUE from '@salesforce/schema/Student__c.Total_Fee_Due__c';

const FIELDS = [FIRST_NAME, LAST_NAME, ROLL_NUMBER, DEPARTMENT, SEMESTER, EMAIL, STATUS, CGPA, ATTENDANCE, FEE_DUE];

export default class CampusXStudentCard extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    studentRecord;

    get student() {
        if (!this.studentRecord.data) {
            // Default demo display if not on a specific record
            return {
                name: 'Tarun Kumar Reddy',
                rollNumber: '22AG1A0501',
                department: 'Computer Science & Engineering',
                semester: 'Semester 8',
                email: 'tharun@campusx.edu',
                status: 'Active',
                cgpa: 8.85,
                attendance: 88.5,
                feeDue: 0
            };
        }
        const data = this.studentRecord.data;
        const first = getFieldValue(data, FIRST_NAME) || '';
        const last = getFieldValue(data, LAST_NAME) || '';
        return {
            name: `${first} ${last}`.trim(),
            rollNumber: getFieldValue(data, ROLL_NUMBER) || '-',
            department: getFieldValue(data, DEPARTMENT) || '-',
            semester: getFieldValue(data, SEMESTER) || '-',
            email: getFieldValue(data, EMAIL) || '-',
            status: getFieldValue(data, STATUS) || 'Active',
            cgpa: getFieldValue(data, CGPA) || 0,
            attendance: getFieldValue(data, ATTENDANCE) || 0,
            feeDue: getFieldValue(data, FEE_DUE) || 0
        };
    }

    get initials() {
        const parts = this.student.name.split(' ');
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return (this.student.name[0] || 'S').toUpperCase();
    }

    get cgpaCategory() {
        const val = this.student.cgpa;
        if (val >= 8.5) return 'Distinction';
        if (val >= 7.0) return 'First Class';
        if (val >= 6.0) return 'Second Class';
        return 'Needs Improvement';
    }

    get attendanceStatus() {
        return this.student.attendance >= 75 ? 'Eligible for Exams' : 'Shortage Warning';
    }

    get attendanceTagClass() {
        return this.student.attendance >= 75 ? 'tag-green' : 'tag-red';
    }

    get feeStatus() {
        return this.student.feeDue > 0 ? 'Payment Pending' : 'All Clear';
    }

    get feeTagClass() {
        return this.student.feeDue > 0 ? 'tag-amber' : 'tag-green';
    }

    get statusBadgeClass() {
        return 'slds-badge slds-theme_success';
    }
}
