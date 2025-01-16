import {test, expect} from '@playwright/test'
import payloads from '../utils/payloads.json';
import {baseUrl} from '../utils/global.var';

test.describe('Create Order Positive flows', async () => {

    test('Create Order With Given Test Code', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let accountNumber: string = 'J3333'
        let testURL = baseUrl + "Create?callingApp=" + callingApp+ "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;
        
        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithGivenTestCode
        })
        
        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).not.toBe('');
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccountNumber).toBe(accountNumber);
        //console.log("AccountNumber:",responsebody.AccountNumber);

        expect(responsebody.AccessionNumber).not.toBe('');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        expect(responsebody.Tests).toBeDefined();

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('STAB');
        //console.log("holdCode value",holdCodeValue);

        const testCodeValue = responsebody.Tests[0].TestCode;
        expect(testCodeValue).toBe('B125');
        //console.log("testCode value",testCodeValue);

        const specimenCodeValue = responsebody.Specimens[0].SpecimenCode;
        expect(specimenCodeValue).toBe('SST');
        //console.log("specimenCode value",specimenCodeValue);
    })

    test('Create Order With  Given Account Number', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let accountNumber: string = 'J3332';
        let testURL = baseUrl + "Create?callingApp=" + callingApp+ "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;
        
        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithGivenAccountNumber
        })
        //console.log('CREATE ORDER ACCOUNT NO J3332', await response.json());

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).not.toBe('');
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccountNumber).toBe(accountNumber);
        //console.log("AccountNumber:",responsebody.AccountNumber);

        expect(responsebody.AccessionNumber).not.toBe('');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        expect(responsebody.Tests).toBeDefined();
        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('STAB');
        //console.log("holdCode value",holdCodeValue);

        const testCodeValue = responsebody.Tests[0].TestCode;
        expect(testCodeValue).toBe('B125');
        //console.log("testCode value",testCodeValue);

        const specimenCodeValue = responsebody.Specimens[0].SpecimenCode;
        expect(specimenCodeValue).toBe('SST');
        //console.log("specimenCode value",specimenCodeValue);
    })

    test('Create Order With Multiple Tests', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let accountNumber: string = 'j3333';
        let testCode1: string = '0009';
        let testURL = baseUrl + "Create?callingApp=" + callingApp+ "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;
        
        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithMultipleTests
        })
        //console.log('CREATE ORDER WITH DIFFERENT TEST', await response.json());
        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).not.toBe('');
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccountNumber).toBe(accountNumber);
        //console.log("AccountNumber:",responsebody.AccountNumber);

        expect(responsebody.AccessionNumber).not.toBe('');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        
        expect(responsebody.Tests).toBeDefined();

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('STAB');
        //console.log("holdCode value",holdCodeValue);

        
        const testCodeValue = responsebody.Tests[0].TestCode;
        expect(testCodeValue).toBe('B125');
       // console.log("testCode value",testCodeValue);

        const specimenCodeValue = responsebody.Specimens[0].SpecimenCode;
        expect(specimenCodeValue).toBe('SST');
       // console.log("specimenCode value",specimenCodeValue);

        if(testCode1 === '0009') {
            const testsObjectArrayLength = responsebody.Tests.length;
            expect(testsObjectArrayLength).toBe(6);
            for(let i=1;i<testsObjectArrayLength;i++) {
                //console.log('test code value ' + i, responsebody.Tests[i].TestCode)
            }
        }
    })
})

test.describe('Order Creation Negative Flows', async() => {

    test('Create Order With Wrong Specimen', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithWrongSpecimen
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('NSRA')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With Age Less Than Required', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithAgeLessThanRequired
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
       // console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
       // console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('CNPD')
       // console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With No Specimen', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithNoSpecimen
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
       // console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
       // console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('RNS')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With DOC in Past', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithDOCinPast
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
       // console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
       // console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('STAB')
       // console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With State Restricted', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithStateRestricted
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
       // console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('STFL')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With Retired Test', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithRetiredTest
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('RETD')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With Clarify Test', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithClarifyTest
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With Male Test Only', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithMaleTestOnly
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('GEN')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With Female Test Only', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const payload = payloads.CreateOrderWithFemaleTestOnly;

        const today = new Date();

        const formatDate = (date: Date) => {
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
          };

        const formatTimeForTimeZone = (timeZone: string) => {
            const options = {
                hour: '2-digit' as '2-digit',
                minute: '2-digit' as '2-digit',
                hour12: true,
                timeZone
            };
        
            const formatter = new Intl.DateTimeFormat('en-US', options);
            return formatter.format(today);
        };
        
        const timeInNJ = formatTimeForTimeZone('America/New_York');

          payload.DateOfCollection = formatDate(today);
          payload.TimeOfCollection = timeInNJ;
          payload.InitialReceivedDate = formatDate(today);
          payload.Tests[0].DateCollected = formatDate(today);
          payload.Tests[1].DateCollected = formatDate(today);
          
         // console.log("today's Date:", formatDate(today));
          //console.log('Time of NJ', timeInNJ);
          //console.log('date in payload', payload);

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payload
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('GENA')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With Duplicate Specimen', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const payload = payloads.CreateOrderWithDuplicateSpecimen;
        
        const today = new Date();

        const formatDate = (date: Date) => {
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
          };

        const formatTimeForTimeZone = (timeZone: string) => {
            const options = {
                hour: '2-digit' as '2-digit',
                minute: '2-digit' as '2-digit',
                hour12: true,
                timeZone
            };
        
            const formatter = new Intl.DateTimeFormat('en-US', options);
            return formatter.format(today);
        };
        
        const timeInNJ = formatTimeForTimeZone('America/New_York');

          payload.DateOfCollection = formatDate(today);
          payload.TimeOfCollection = timeInNJ;
          payload.InitialReceivedDate = formatDate(today);
          payload.Tests[0].DateCollected = formatDate(today);
          
          //console.log("today's Date:", formatDate(today));
          //console.log('Time of NJ', timeInNJ);
        
        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payload
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With Different Account', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithDifferentAccount
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('STAB')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With Provider Inactive - PCL Flag', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithProviderInactivePCLFlag
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('PCL')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With Preapproval - PAH Flag', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithPreapprovalPAHFlag
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).not.toBe('');
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).not.toBe('');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[3].HoldCode;
        expect(holdCodeValue).toBe('PAH')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With Duplicate - DUP Flag', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const payload = payloads.CreateOrderWithDuplicateDUPFlag;
        const today = new Date();

        const formatDate = (date: Date) => {
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
          };

        const formatTimeForTimeZone = (timeZone: string) => {
            const options = {
                hour: '2-digit' as '2-digit',
                minute: '2-digit' as '2-digit',
                hour12: true,
                timeZone
            };
        
            const formatter = new Intl.DateTimeFormat('en-US', options);
            return formatter.format(today);
        };
        
        const timeInNJ = formatTimeForTimeZone('America/New_York');

          payload.DateOfCollection = formatDate(today);
          payload.TimeOfCollection = timeInNJ;
          payload.InitialReceivedDate = formatDate(today);
          payload.Tests[0].DateCollected = formatDate(today);
          payload.Tests[1].DateCollected = formatDate(today);
          
          //console.log("today's Date:", formatDate(today));
          //console.log('Time of NJ', timeInNJ);
        
        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payload
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
        //console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('DUP')
        //console.log("holdCode value",holdCodeValue);
    })

    test('Create Order With CNPD', async ({request}) => {
        let callingApp: string = 'SINGLE_SCREEN';
        let userName: string = 'Raj';
        let isScarlet: boolean = false;
        let testURL = baseUrl + "Create?callingApp=" + callingApp + "&userName=" + userName + "&clientID=&isScarlet=" + isScarlet;

        const response = await request.post(testURL, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain'
            },
            data: payloads.CreateOrderWithCNPD
        })

        const responsebody = await response.json();

        expect(response.status()).toBe(200);
        //console.log("response code", response.status());

        expect(responsebody.OrderId).toBe(0);
        //console.log("OrderId:",responsebody.OrderId);

        expect(responsebody.AccessionNumber).toBe('-NEW-');
       // console.log("AccessionNumber:",responsebody.AccessionNumber);

        const holdCodeValue = responsebody.Tests[0].HoldCode;
        expect(holdCodeValue).toBe('CNPD')
        //console.log("holdCode value",holdCodeValue);
    })
})