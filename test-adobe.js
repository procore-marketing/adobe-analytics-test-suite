const puppeteer = require('puppeteer');
const fields = require('./fields');
const createCSV = require('./create-csv');
const timestamp = new Date(Date.now()).toISOString();

const urls = ['https://www.procore.com/','https://www.procore.com/about','https://www.procore.com/blueprint','https://www.procore.com/buildersclub','https://www.procore.com/certification','https://www.procore.com/construction-financials','https://www.procore.com/construction-financials/accounting-integrations','https://www.procore.com/continuing-education','https://www.procore.com/demo','https://www.procore.com/en-au','https://www.procore.com/en-au/about','https://www.procore.com/en-au/blueprint','https://www.procore.com/en-au/buildersclub','https://www.procore.com/en-au/certification','https://www.procore.com/en-au/construction-financials','https://www.procore.com/en-au/construction-financials/accounting-integrations','https://www.procore.com/en-au/continuing-education','https://www.procore.com/en-au/demo','https://www.procore.com/en-au/engineering','https://www.procore.com/en-au/events','https://www.procore.com/en-au/field-productivity','https://www.procore.com/en-au/field-productivity/crews','https://www.procore.com/en-au/innovation-lab','https://www.procore.com/en-au/jobs','https://www.procore.com/en-au/jobs/benefits','https://www.procore.com/en-au/jobs/openings','https://www.procore.com/en-au/jobs/openings/1056317','https://www.procore.com/en-au/jobs/sales','https://www.procore.com/en-au/legal','https://www.procore.com/en-au/legal/api-terms-and-conditions','https://www.procore.com/en-au/partners','https://www.procore.com/en-au/platform','https://www.procore.com/en-au/press','https://www.procore.com/en-au/press/habitat-for-humanity-and-procore-partner-for-a-brush-with-kindness','https://www.procore.com/en-au/press/procore-acquires-bimanywhere','https://www.procore.com/en-au/project-management','https://www.procore.com/en-au/project-management/bidding','https://www.procore.com/en-au/projects','https://www.procore.com/en-au/quality-safety','https://www.procore.com/en-au/quality-safety/daily-log','https://www.procore.com/en-au/safety-qualified','https://www.procore.com/en-au/subcontractors','https://www.procore.com/en-au/subs-demo','https://www.procore.com/en-au/webinars','https://www.procore.com/en-au/workshops','https://www.procore.com/en-ca','https://www.procore.com/en-ca/about','https://www.procore.com/en-ca/blueprint','https://www.procore.com/en-ca/buildersclub','https://www.procore.com/en-ca/certification','https://www.procore.com/en-ca/construction-financials','https://www.procore.com/en-ca/construction-financials/accounting-integrations','https://www.procore.com/en-ca/continuing-education','https://www.procore.com/en-ca/demo','https://www.procore.com/en-ca/engineering','https://www.procore.com/en-ca/events','https://www.procore.com/en-ca/field-productivity','https://www.procore.com/en-ca/field-productivity/crews','https://www.procore.com/en-ca/innovation-lab','https://www.procore.com/en-ca/jobs','https://www.procore.com/en-ca/jobs/benefits','https://www.procore.com/en-ca/jobs/openings','https://www.procore.com/en-ca/jobs/openings/1056317','https://www.procore.com/en-ca/jobs/sales','https://www.procore.com/en-ca/legal','https://www.procore.com/en-ca/legal/api-terms-and-conditions','https://www.procore.com/en-ca/partners','https://www.procore.com/en-ca/platform','https://www.procore.com/en-ca/press','https://www.procore.com/en-ca/press/habitat-for-humanity-and-procore-partner-for-a-brush-with-kindness','https://www.procore.com/en-ca/press/procore-acquires-bimanywhere','https://www.procore.com/en-ca/project-management','https://www.procore.com/en-ca/project-management/bidding','https://www.procore.com/en-ca/projects','https://www.procore.com/en-ca/quality-safety','https://www.procore.com/en-ca/quality-safety/daily-log','https://www.procore.com/en-ca/roadshow','https://www.procore.com/en-ca/safety-qualified','https://www.procore.com/en-ca/subcontractors','https://www.procore.com/en-ca/subs-demo','https://www.procore.com/en-ca/webinars','https://www.procore.com/en-ca/workshops','https://www.procore.com/en-gb','https://www.procore.com/en-gb/about','https://www.procore.com/en-gb/blueprint','https://www.procore.com/en-gb/buildersclub','https://www.procore.com/en-gb/certification','https://www.procore.com/en-gb/construction-financials','https://www.procore.com/en-gb/construction-financials/accounting-integrations','https://www.procore.com/en-gb/continuing-education','https://www.procore.com/en-gb/demo','https://www.procore.com/en-gb/engineering','https://www.procore.com/en-gb/events','https://www.procore.com/en-gb/field-productivity','https://www.procore.com/en-gb/field-productivity/crews','https://www.procore.com/en-gb/innovation-lab','https://www.procore.com/en-gb/jobs','https://www.procore.com/en-gb/jobs/benefits','https://www.procore.com/en-gb/jobs/openings','https://www.procore.com/en-gb/jobs/openings/1056317','https://www.procore.com/en-gb/jobs/sales','https://www.procore.com/en-gb/legal','https://www.procore.com/en-gb/legal/api-terms-and-conditions','https://www.procore.com/en-gb/partners','https://www.procore.com/en-gb/platform','https://www.procore.com/en-gb/press','https://www.procore.com/en-gb/press/habitat-for-humanity-and-procore-partner-for-a-brush-with-kindness','https://www.procore.com/en-gb/press/procore-acquires-bimanywhere','https://www.procore.com/en-gb/project-management','https://www.procore.com/en-gb/project-management/bidding','https://www.procore.com/en-gb/projects','https://www.procore.com/en-gb/quality-safety','https://www.procore.com/en-gb/quality-safety/daily-log','https://www.procore.com/en-gb/roadshow','https://www.procore.com/en-gb/safety-qualified','https://www.procore.com/en-gb/subcontractors','https://www.procore.com/en-gb/subs-demo','https://www.procore.com/en-gb/webinars','https://www.procore.com/en-gb/workshops','https://www.procore.com/engineering','https://www.procore.com/events','https://www.procore.com/field-productivity','https://www.procore.com/field-productivity/crews','https://www.procore.com/field-productivity/timesheets','https://www.procore.com/innovation-lab','https://www.procore.com/jobs','https://www.procore.com/jobs/benefits','https://www.procore.com/jobs/openings','https://www.procore.com/jobs/openings/1056317','https://www.procore.com/jobs/sales','https://www.procore.com/legal','https://www.procore.com/legal/api-terms-and-conditions','https://www.procore.com/partners','https://www.procore.com/platform','https://www.procore.com/press','https://www.procore.com/press/habitat-for-humanity-and-procore-partner-for-a-brush-with-kindness','https://www.procore.com/press/procore-acquires-bimanywhere','https://www.procore.com/project-management','https://www.procore.com/project-management/bidding','https://www.procore.com/projects','https://www.procore.com/quality-safety','https://www.procore.com/quality-safety/daily-log','https://www.procore.com/roadshow','https://www.procore.com/roi','https://www.procore.com/safety-qualified','https://www.procore.com/subcontractors','https://www.procore.com/subs-demo','https://www.procore.com/tour','https://www.procore.com/webinars','https://www.procore.com/workshops','https://www.procore.com/en-gb/fr-ca/legal/terms-of-service'];
// const urls = ['https://www.procore.com/','https://www.procore.com/safety-qualified'];
// const urls = ['https://www.procore.com/tour', 'https://www.procore.com/en-au/about', 'https://www.procore.com/en-gb/safety-qualified', 'https://www.procore.com/project-management/bidding'];

(async() => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-features=NetworkService'],
    // Need to use Chrome if you want to play videos, Chromium doesn't support mp4
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: false,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  const results = [];
  let currentUrl;

  await page.setRequestInterception(true);

  page.on('request', request => {
    request.continue();
  });

  page.on('response', response => {
    const resultObj = {};
    const requestUrl = response.request().url();

    if (requestUrl.indexOf('https://procore.sc.omtrdc.net/b/ss/') > -1) {
      try {
        resultObj['url'] = response.request().headers().referer;
        resultObj['rs'] = /\/b\/ss\/(.*?)\//g.exec(requestUrl)[1];
        resultObj['status'] = '' + response.status();
        requestUrl.split('?')[1].split('&').map(param => {
          let paramParts = param.split('=');

          if (paramParts[0] === 'events' && paramParts[1]) {
            let events = decodeURIComponent(paramParts[1]).split(',').map(event => {
              eventParts = event.split('=');
              if (eventParts[1]) {
                resultObj[eventParts[0]] = eventParts[1];
              } else {
                resultObj[eventParts[0]] = '1';
              }
            });
          } else {
            resultObj[paramParts[0]] = decodeURIComponent(paramParts[1]).replace(/,/g, '|').replace(/\t/g, '');
          }
        });
        results.push(resultObj);
      } catch (err) {
        console.log(err);
      }
    }
  });

  let interactedWithDrift = false;
  let acceptCookies = true;

  for (let url of urls) {
    currentUrl = url;
    if (Math.random() < .1) {
      url += '?utm_medium=Social&utm_source=LinkedIn&utm_campaign=BRD&utm_term=Organic&utm_content=Jobsite_Constructions-up-and-coming-tech';
    }
    if (Math.random() < .1) {
      url += '#fragment';
    }
    try {
      await page.goto(url, {waitUntil: 'load', timeout: 60000});

      // Click Accept Cookies
      try {
        if (acceptCookies) {
          acceptCookies = false;
          await page.waitFor('button.optanon-allow-all', { timeout: 15000 })
          await page.waitFor(2000);
          const acceptButton = await page.$('button.optanon-allow-all');
          try {
            await acceptButton.click();
            await page.waitFor(1000);
          } catch (err) {
            console.log(err, url);
          }
        }
      } catch (err) {
        console.log(err, url);
      }

      // Create Procore Cookie
      await page.evaluate(() => {
        if (typeof _satellite !== 'undefined' && !_satellite.cookie.get('pc_mkt_app')) {
          _satellite.cookie.set('pc_mkt_app', 'testid-1234567890', { expires: 1 })
        }
      });

      // Toggle tabs to fire the tab focus count
      // const pages = await browser.pages();
      // for (let page of pages) {
      //   await page.bringToFront();
      // }

      // Create a link with dataTrackClick to click
      if (Math.random() < .3) {
        const clickElement = await page.evaluateHandle(() => {
          let a = document.createElement('a');
          a.setAttribute('data-track-click', 'test type, test name, test label');
          a.textContent = 'Track';
          document.body.appendChild(a);
          return a;
        });
        await clickElement.click();
        await page.waitFor(100);
      }

      // Download link click
      // const clickElement = await page.evaluateHandle(() => {
      //   let a = document.createElement('a');
      //   a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('This is the content of my file :)'));
      //   a.setAttribute('download', 'hello.txt');
      //   a.textContent = 'Download';
      //   document.body.appendChild(a);
      //   return a;
      // });
      // await clickElement.click();
      // await page.waitFor(100);

      // Exit link click
      // const clickElement = await page.evaluateHandle(() => {
      //   let a = document.createElement('a');
      //   a.setAttribute('href', 'https://www.google.com/');
      //   a.textContent = 'Exit';
      //   document.body.appendChild(a);
      //   return a;
      // });
      // await clickElement.click();
      // await page.waitFor(100);

      // Trigger a custom event
      await page.evaluate(() => {
        if (Procore.metrics.events) {
          Procore.metrics.events.push({
            trigger: 'customEvent',
            type: 'test type',
            name: 'test name',
            label: 'test label'
          });
        }
      });
      await page.waitFor(100);

      // Click Drift widget
      // try {
      //   if (!interactedWithDrift) {
      //     interactedWithDrift = true;
      //     await page.waitFor('#drift-widget', { timeout: 15000 })
      //     const iframeHandle = await page.$('#drift-widget');
      //     const iframe = await iframeHandle.contentFrame();

      //     try {
      //       await iframe.waitFor('._1QMEkp0zgBS93G6kHWmAHJ', { visible: true, timeout: 10000 });
      //       const chatBubble = await iframe.$('._1QMEkp0zgBS93G6kHWmAHJ');
      //       await chatBubble.click();
      //       await iframe.waitFor('.WHPsCOigZpsybSK2TV9Fk button', { visible: true, timeout: 10000 });
      //       const chatOption = await iframe.$('.WHPsCOigZpsybSK2TV9Fk button:last-child');
      //       if (chatOption !== null) {
      //         await chatOption.click();
      //         await page.waitFor(1000);
      //       }
      //       const closeBtn = await iframe.$('#widgetCloseButton');
      //       await closeBtn.click();
      //       await page.waitFor(1000);
      //     } catch (err) {
      //       console.log(err, url);
      //     }
      //   }
      // } catch (err) {
      //   console.log(err, url);
      // }

      // Interact with tour videos
      if (url.indexOf('/tour') > -1) {
        if (await page.$('.btn-play') !== null) {
          await page.click('.btn-play');
          await page.waitFor(50000);
        }
      }

      // Interact with the demo page
      if (Math.random() < .3) {
        const demoBtn = await page.$('#request-a-demo');
        if (demoBtn !== null) {
          await page.goto('https://www.procore.com/demo', {waitUntil: 'load', timeout: 60000});
          await page.waitFor(1000);
          if (await page.$('#mktoForm_4876 #FirstName') !== null) {
            await page.type('#mktoForm_4876 #FirstName', 'Josh');
            await page.type('#mktoForm_4876 #LastName', 'Bradley');
            if (await page.$('#mktoForm_4876 #Phone') !== null) await page.type('#mktoForm_4876 #Phone', '1234567890');
            if (await page.$('#mktoForm_4876 #Company') !== null) await page.type('#mktoForm_4876 #Company', 'Procore');
            if (await page.$('#mktoForm_4876 #Routing_Company_Type__c') !== null) await page.select('#mktoForm_4876 #Routing_Company_Type__c', 'General Contractor');
            await page.click('#mktoForm_4876 .mktoButton');
            await page.waitFor(2000);
          }
          // if (Math.random() < .1) {
          //   if (await page.$('[data-embed]') !== null) {
          //     await page.click('[data-embed]');
          //     await page.waitFor(5000);
          //     await page.click('.wistia_popover_embed');
          //     await page.waitFor(5000);
          //     await page.click('.wistia_popover_embed');
          //     await page.waitFor(60000);
          //   }
          // }
          if (Math.random() < .3) {
            await page.type('#mktoForm_4876 #Email', 'joshua.bradley+adobetest@procore.com');
            await Promise.all([
              page.click('#mktoForm_4876 .mktoButton'),
              page.waitForNavigation({ waitUntil: 'load' }),
              page.waitForNavigation({ waitUntil: 'load' }),
            ]);
          }
        }
      }

      // Get events in data layer
      // const eventLayer = await page.evaluate(() => {
      //   if (Procore.metrics.events) {
      //     return Procore.metrics.events;
      //   }
      // });
      // console.log(eventLayer);

    } catch (err) {
      console.log(err, url);
    }
  }

  await createCSV(results, fields.pageviewFields, 'Pageview', timestamp);
  await createCSV(results, fields.beforeUnloadFields, 'Before Unload', timestamp);
  await createCSV(results, fields.clickFields, 'Click Event', timestamp);
  await createCSV(results, fields.customEventFields, 'Custom Event', timestamp);
  await createCSV(results, fields.formCompleteFields, 'Form Complete Event', timestamp);
  await createCSV(results, fields.formViewedFields, 'Form Viewed Event', timestamp);
  await createCSV(results, fields.videoFields, 'Video Event', timestamp);
  // console.log(results);
  await browser.close();
})();
