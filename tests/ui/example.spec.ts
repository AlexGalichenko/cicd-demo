import { test, expect } from '@playwright/test';
import { HomePage, LoginPage } from './Pages';

class User {
  get validUser() {
    return {
      username: 'standard_user',
      password: 'secret_sauce'
    }
  }

  get lockedUser() {
    return {
      username: 'locked_out_user',
      password: 'secret_sauce'
    }
  }
}

type Fixture = {
  loginPage: LoginPage;
  homePage: HomePage;
  user: User;
}

const extendedTest = test.extend<Fixture>({
  loginPage: async ({ page }, use) => {
    console.log('prepequisites');
    await use(new LoginPage({ page }))
    console.log('postrequisites');
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage({ page }))
  },
  user: async ({}, use) => {
    await use(new User());
  }
})

extendedTest('verify that user is able to login', async ({ loginPage, homePage, user }) => {
  await loginPage.page.goto('https://www.saucedemo.com/');
  await loginPage.login(user.validUser);
  await expect(homePage.logo).toBeVisible();
  await expect(homePage.logo).toHaveText('Swag Labs42');
});

extendedTest('verify that user with incorrect password is not able to login', async ({ loginPage, user }) => {
  await loginPage.page.goto('https://www.saucedemo.com/');
  await loginPage.login(user.lockedUser);
  await expect(loginPage.error).toBeVisible();
  await expect(loginPage.error).toContainText('Sorry, this user has been locked out.');
});
