import {test, expect} from '@playwright/test'

test.describe('Fetch Order Flows', async () => {

    test('Fetch Order With EReq Number', async ({request}) => {
        let callingApp: string = 'CE';
        let userName: string = 'Raj';
        let accountNumber: string = '';
        let eReqNumber: string = 'J3333,QA11252';
        let testURL = "https://orderservice-dev.bioreference.com/Order/Fetch?callingApp=" + callingApp + "&userName=" + userName + "&eReqNumber=" + eReqNumber + "&accountNumber=" + accountNumber;

        const response = await request.get(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            }
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).not.toBe('');
        //console.log("OrderId:", responsebody.OrderId);

        expect(responsebody.Tests).toBeDefined();
    })
})