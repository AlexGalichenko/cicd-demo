import { Page } from '@playwright/test';

export class BasePage {
    page: Page;
    constructor({ page }: { page: Page }) {
        this.page = page;
    }
}

export class LoginPage extends BasePage {
    usernameInput = this.page.locator('[data-test="username"]');
    passwordInput = this.page.locator('[data-test="password"]');
    loginButton = this.page.locator('[data-test="login-button"]');
    error = this.page.locator('[data-test="error"]');
    
    async login({ username, password }) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

export class HomePage extends BasePage {
    logo = this.page.locator('.app_logo');
}