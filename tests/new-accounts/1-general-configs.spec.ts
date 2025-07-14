import { expect } from '@playwright/test';
import { test } from '../helpers/fixtures';
import 'dotenv/config';

test('Certificate', async ({ page }) => {
    //acessa as configurações
    await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/configuracoes/geral");
    await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/configuracoes/geral");
    await page.getByRole('heading', { name: 'Configurações gerais' }).click();

    // configuração do certificado
    // verifica se já tem certificado
    let hasCertificate = await page.getByRole('textbox', { name: 'Emitido para' }).isVisible();
    if (!hasCertificate) {
        // coloca o certificado
        await page.getByRole('button', { name: 'Carregar certificado' }).click();
        await page.locator('input[type="file"][name="certFile"]').setInputFiles('tests/assets/certificate/' + process.env.PLAYWRIGHT_CERT_FILE);
        await page.getByRole('textbox', { name: 'Senha do certificado (' }).click();
        await page.getByRole('textbox', { name: 'Senha do certificado (' }).fill(process.env.PLAYWRIGHT_CERT_PASSWORD || '');
        await page.getByRole('button', { name: 'Enviar' }).click();
    }

    await expect.soft(page.locator('gw-general-settings')).toContainText('Emitido para');
});

test('Negative Stock', async ({ page }) => {
    //acessa as configurações
    await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/configuracoes/geral");
    await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/configuracoes/geral");
    await page.getByRole('heading', { name: 'Configurações gerais' }).click();
    // permite estoque negativo
    // marca estoque negativo
    let allow_negative_stock = await page.getByRole("checkbox", { name: "Permitir estoque negativo" }).isChecked();
    if (!allow_negative_stock) {
        await page.locator('label').filter({ hasText: 'Permitir estoque negativo' }).click();
        await page.locator('mat-card-actions').filter({ hasText: 'Desfazer Salvar' }).getByRole('button').nth(1).click();
    }
    allow_negative_stock = await page.locator('.mat-checkbox-inner-container').first().isChecked();
    expect.soft(allow_negative_stock).toEqual(true);
});

test('IP Verification', async ({ page }) => {
    //acessa as configurações
    await page.goto(process.env.PLAYWRIGHT_GWEB_URL + "/configuracoes/geral");
    await page.waitForURL(process.env.PLAYWRIGHT_GWEB_URL + "/configuracoes/geral");
    await page.getByRole('heading', { name: 'Configurações gerais' }).click();
    // desativa verificação de IP
    // Verifica se a configuração já está marcada através da mensagem amarela abaixo
    let isIPVerificationOn = await page.getByText('Ativar esta configuração pode ser um risco à segurança dos dados da empresa. Utilize-a somente em caso de problemas de conectividade/logoffs constantes').isVisible();
    if (!isIPVerificationOn) {
        // desativa a configuração, salva e confirma
        await page.getByText('Desativar verificação de IP').click();
        await page.locator('mat-card-actions').filter({ hasText: 'Desfazer Salvar' }).getByRole('button').nth(1).click();
        await page.getByRole('button', { name: 'Confirmar' }).click();
    }

    await expect(page.getByText('Ativar esta configuração pode ser um risco à segurança dos dados da empresa. Utilize-a somente em caso de problemas de conectividade/logoffs constantes')
    ).toBeVisible();
});