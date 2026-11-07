# 🎓 CampusX – Salesforce Student Portal

> **Centralized Higher-Education Student Management System** built on Salesforce CRM. Enables students, faculty, and administrators to seamlessly track academic results, fee structures, examination eligibility, and attendance records.

![Salesforce](https://img.shields.io/badge/Salesforce-CRM%20%7C%20Lightning-00A1E0?logo=salesforce&logoColor=white)
![SFDX](https://img.shields.io/badge/Salesforce%20DX-v61.0-blue)
![LWC](https://img.shields.io/badge/UI-Lightning%20Web%20Components-orange)
![Flows](https://img.shields.io/badge/Automation-Salesforce%20Flows-success)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

---

## 📌 Project Overview

**CampusX** is designed to eliminate information silos across university departments. By centralizing student profiles onto Salesforce, students and staff gain real-time visibility into academic performance, outstanding fee dues, and attendance compliance.

### 🌟 Key Capabilities
- **360° Student Directory:** Unified student profiles storing department, current semester, roll number, admission records, and contact details.
- **Academic Results & Transcript Tracking:** Semester-wise examination marks (Internal + External), automated total calculation, grades, and backlog tracking.
- **Financial Fee Ledger:** Invoicing, partial payments, automated overdue detection, transaction reference tracking, and live balance due formulas.
- **Automated Attendance Monitoring:** Monthly attendance tracking with real-time percentage formulas and instant **"Shortage Warning"** triggers (< 75% cutoff).
- **Custom Lightning Web Component (LWC):** `campusXStudentCard` displaying key student indicators (CGPA badge, attendance health tag, fee balance) right at the top of the record and home page.
- **Flow Automation:** Record-triggered alerts when attendance drops below university examination thresholds.

---

## 🏗️ Architecture & Data Model

CampusX is built using a relational schema centered around the `Student__c` custom object:

```
   ┌───────────────────────────────────────────────┐
   │                  Student__c                   │
   │  (Roll Number, Name, Dept, Semester, CGPA)    │
   └───────┬──────────────┬──────────────┬─────────┘
           │              │              │
           ▼              ▼              ▼
   ┌───────────────┐ ┌───────────────┐ ┌─────────────────┐
   │Academic_Result│ │  Fee_Record   │ │   Attendance    │
   │ (Marks/Grade) │ │ (Tuition/Due) │ │ (Monthly Reg.)  │
   └───────────────┘ └───────────────┘ └─────────────────┘
```

### 1. Custom Objects & Key Fields

| Object | API Name | Description | Key Custom Fields |
|---|---|---|---|
| **Student** | `Student__c` | Central student profile | `Roll_Number__c` (Unique ID), `Department__c`, `Current_Semester__c`, `CGPA__c`, `Total_Fee_Due__c`, `Overall_Attendance__c` |
| **Academic Result** | `Academic_Result__c` | Exam marks per subject | `Student__c` (Lookup), `Semester__c`, `Subject_Code__c`, `Internal_Marks__c`, `External_Marks__c`, `Total_Marks__c` (Formula), `Grade__c`, `Result_Status__c` |
| **Fee Record** | `Fee_Record__c` | Ledger for college fees | `Student__c` (Lookup), `Academic_Year__c`, `Fee_Type__c`, `Total_Amount__c`, `Paid_Amount__c`, `Due_Amount__c` (Formula), `Payment_Status__c`, `Transaction_Reference__c` |
| **Attendance Record** | `Attendance__c` | Monthly attendance log | `Student__c` (Lookup), `Month__c`, `Total_Working_Days__c`, `Days_Present__c`, `Days_Absent__c` (Formula), `Attendance_Percentage__c` (Formula), `Eligibility_Status__c` (Formula) |

---

## 🚀 How to Push this Project to Your GitHub

If you want to put this project on your personal GitHub profile:

### Option A: Using the Automated Script (Windows)
Double-click `scripts/push-to-github.bat` and paste your GitHub repository URL when prompted!

### Option B: Using Git Command Line
```bash
# 1. Initialize git in this directory
git init

# 2. Stage all files
git add .

# 3. Create your first commit
git commit -m "Initial commit: CampusX Salesforce Student Portal with Custom Objects, Flows, LWC, and Mock Data"

# 4. Set default branch to main
git branch -M main

# 5. Connect your GitHub remote repository (replace with your repo URL)
git remote add origin https://github.com/<YOUR_USERNAME>/campusx-salesforce-portal.git

# 6. Push to GitHub!
git push -u origin main
```

---

## ⚡ How to Deploy into Any Salesforce Org

You or your friend can deploy this entire application into any **Free Salesforce Developer Edition** org or **Trailhead Playground** in minutes!

### Prerequisites
1. **Salesforce Org:** A free Developer Edition org ([Sign up here](https://developer.salesforce.com/signup)) or Trailhead Playground.
2. **Salesforce CLI:** Install the official CLI from [developer.salesforce.com/tools/salesforcecli](https://developer.salesforce.com/tools/salesforcecli) (or via `npm install -g @salesforce/cli`).
3. **VS Code (Optional):** With the **Salesforce Extension Pack** installed.

---

### Step 1: Clone & Authenticate
```bash
git clone https://github.com/<YOUR_USERNAME>/campusx-salesforce-portal.git
cd campusx-salesforce-portal

# Authenticate with your free Salesforce Developer Org
sf org login web -a CampusXOrg
```

### Step 2: Deploy Metadata (One Command)
```bash
sf project deploy start -o CampusXOrg
```
*This automatically deploys all Custom Objects, Fields, Tabs, the CampusX Lightning App, the Attendance Flow, and the `campusXStudentCard` LWC.*

### Step 3: Assign the Administrator Permission Set
```bash
sf org assign permset -n CampusX_Admin -o CampusXOrg
```

### Step 4: Import Sample Mock Data
Import the pre-packaged students, results, fees, and attendance trees:
```bash
sf data import tree -p data/sample-data-tree.json -o CampusXOrg
```

### Step 5: Launch CampusX
```bash
sf org open -p /lightning/app/c__CampusX_Student_Portal -o CampusXOrg
```
Or click the **App Launcher (9 dots)** in Salesforce and search for **CampusX Student Portal**!

---

## 📊 Mock Data Included

The `data/` folder contains comprehensive, realistic mock data:
- `data/students.csv`: 10 complete student profiles across CSE, IT, ECE, EEE, Mechanical, and Civil engineering branches with CGPA and contact info.
- `data/academic_results.csv`: 19 course exam marks across semesters with internal, external, and letter grades.
- `data/fee_records.csv`: 11 tuition and examination fee records including Paid, Partially Paid, and Overdue statuses.
- `data/attendance.csv`: 15 monthly attendance registers tracking working days and presence.
- `data/sample-data-tree.json`: Relational JSON import tree for 1-click CLI loading.

*(You can also import these CSVs directly using Salesforce's built-in **Data Import Wizard** under Setup).*

---

## 🎨 Lightning Web Component: `campusXStudentCard`

The project includes a production-grade LWC component:
- **Visual Status Pill:** Displays dynamic Active / Inactive states.
- **CGPA Gauge:** Shows CGPA score with distinction / first-class tags.
- **Attendance Indicator:** Automatically flags < 75% attendance with a red warning badge.
- **Fee Balance Card:** Highlights pending dues in real-time.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
