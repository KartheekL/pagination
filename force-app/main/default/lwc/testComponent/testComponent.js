import { LightningElement, track } from 'lwc';
import getAccounts from '@salesforce/apex/AccountsQuerySelector.getAccounts';
const columns = [
    {
        label: "Account Name",
        fieldName: "Name"
    }
]
export default class TestComponent extends LightningElement {
    allSelectedRows = new Set()
    @track data = []
    allRecords = []
    columns = columns
    async connectedCallback(){
        try {
            this.allRecords = await getAccounts();
            this.data = this.allRecords.slice(0,5)
            const rows = this.allRecords.filter((value,index) => (index % 2 === 0)).map(value => {
                this.allSelectedRows.add(value.Id)
                return value.Id
            })
            this.template.querySelector('lightning-datatable').selectedRows = rows
            console.warn('After',JSON.stringify(this.selectedRows));
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    }
    
    handleRowSelection(event) {
        console.warn(JSON.stringify(event.target.getSelectedRows()));
        console.warn('selectedRows',JSON.stringify(event.target.selectedRows));
        this.data.forEach(element => {
            if(this.allSelectedRows.has(element.Id)) this.allSelectedRows.delete(element.Id)
        });
        event.target.getSelectedRows().forEach(element => {
            if(!this.allSelectedRows.has(element.Id)) this.allSelectedRows.add(element.Id)
        });
    }
    
    handleNextClick(event) {
        event.preventDefault();
        this.data = this.allRecords.slice(5);
        this.template.querySelector('lightning-datatable').selectedRows = Array.from(this.allSelectedRows)
    }
    
    handlePrevClick(event) {
        event.preventDefault();
        this.data = this.allRecords.slice(0,5);
        this.template.querySelector('lightning-datatable').selectedRows = Array.from(this.allSelectedRows)
    }

}