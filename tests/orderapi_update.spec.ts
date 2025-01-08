import {test, expect} from '@playwright/test'
import payloads from '../utils/payloads.json';

test.describe('Update Order Flows', async () => {

    test('Update Order With DOC Change - J148-LAV', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = "https://orderservice-dev.bioreference.com/Order/Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.UpdateOrderWithDOCChangeJ148LAV
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        console.log("OrderId:", responsebody.OrderId);

        expect(responsebody.Tests).toBeDefined();
    })

    test('Change Date of Birth', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = "https://orderservice-dev.bioreference.com/Order/Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.ChangeDateOfBirth
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        console.log("OrderId:", responsebody.OrderId);

        expect(responsebody.Tests).toBeDefined();
    })

    test('Update Test code/Specimen - 0102-LAV', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = "https://orderservice-dev.bioreference.com/Order/Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.UpdateTestcodeSpecimen0102LAV
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        console.log("OrderId:", responsebody.OrderId);

        expect(responsebody.Tests).toBeDefined();
    })

    test('Update Test code/Specimen - J148-SST', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = "https://orderservice-dev.bioreference.com/Order/Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.UpdateTestcodeSpecimenJ148SST
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        console.log("OrderId:", responsebody.OrderId);

        expect(responsebody.Tests).toBeDefined();
    })

    test('Remove Test', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = "https://orderservice-dev.bioreference.com/Order/Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.RemoveTest
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        console.log("OrderId:", responsebody.OrderId);

        expect(responsebody.Tests).toBeDefined();
    })

    test('Update Specimen - J148-SST', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = "https://orderservice-dev.bioreference.com/Order/Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.UpdateSpecimenJ148SST
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        console.log("OrderId:", responsebody.OrderId);

        expect(responsebody.Tests).toBeDefined();
    })

    test('Update Provider Details', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = "https://orderservice-dev.bioreference.com/Order/Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.UpdateProviderDetails
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        console.log("OrderId:", responsebody.OrderId);

        expect(responsebody.Tests).toBeDefined();
    })

    test('Adding a Test', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = "https://orderservice-dev.bioreference.com/Order/Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.AddingATest
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        console.log("OrderId:", responsebody.OrderId);

        expect(responsebody.Tests).toBeDefined();
    })
})