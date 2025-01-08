import {test, expect} from '@playwright/test'

test.describe('Search Order Flows', async () => {

    test('Search Order With Account J3333', async ({request}) => {
        let callingApp: string = 'CE';
        let userName: string = 'Raj';
        let accountNumber: string = 'J3333';
        let excludeStatus: string = 'DRW';
        let fetchAccessioned: boolean = false;
        let pageIndex: number = 0;
        let pageSize: number = 30;
        let testURL = "https://orderservice-dev.bioreference.com/Order/Search?callingApp=" + callingApp + "&userName=" + userName + "&fromDate=&toDate=&ovOrderNumber=&accountNumber=" + accountNumber + "&patientLastName=&patientFirstName=&patientDOB=&patientID=&eReqNumber=&divisionId=&excludeStatus=" + excludeStatus + "&fetchAccessioned=" + fetchAccessioned + "&providerLastName=&providerFirstName=&patientEUID=&enterersLocation=&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&clientId=";
        
        const response = await request.get(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            }
            
        })
        
        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.TotalOrderCount).toBe(pageSize);
        //console.log("TotalOrderCount:",responsebody.TotalOrderCount);

        const orderId = responsebody.ListOrdersSummary[0].OrderID;
        expect(orderId).not.toBe('');
        //console.log("OrderId:",orderId);
        
        const AccountNumber = responsebody.ListOrdersSummary[0].AccountNumber;
        expect(AccountNumber).toBe('J3333');
        //console.log("AccountNumber:",AccountNumber);
        
        const accessionNumber = responsebody.ListOrdersSummary[0].AccessionNumber;
        expect(accessionNumber).toBe('');

        const eReqNo = responsebody.ListOrdersSummary[0].EReqNo;
        expect(responsebody.EReqNo).not.toBe('');
        //console.log("EReqNo:",eReqNo);
    })

    test('Search Order with Account AG771', async ({request}) => {
        let callingApp: string = 'CE';
        let userName: string = 'Raj';
        let accountNumber: string = 'AG771';
        let excludeStatus: string = 'DRW';
        let fetchAccessioned: boolean = false;
        let pageIndex: number = 0;
        let pageSize: number = 1;
        let testURL = "https://orderservice-dev.bioreference.com/Order/Search?callingApp=" + callingApp + "&userName=" + userName + "&fromDate=&toDate=&ovOrderNumber=&accountNumber=" + accountNumber + "&patientLastName=&patientFirstName=&patientDOB=&patientID=&eReqNumber=&divisionId=&excludeStatus=" + excludeStatus + "&fetchAccessioned=" + fetchAccessioned + "&providerLastName=&providerFirstName=&patientEUID=&enterersLocation=&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&clientId=";
    
        const response = await request.get(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            }
            
        })
        
        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.TotalOrderCount).toBe(0);
        //console.log("TotalOrderCount:",responsebody.TotalOrderCount);

        expect(responsebody.Status).toBe('No orders found.');
        //console.log("Status:", responsebody.Status);
        
        expect(responsebody.HasErrors).toBeTruthy();
        //console.log("Has Errors:", responsebody.HasErrors);
    })
})