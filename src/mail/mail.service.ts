import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mailgun from 'mailgun.js';
import * as FormData from 'form-data';

@Injectable()
export class MailgunService {
  
  private readonly MAILGUN_KEY: string;
  private readonly MAILGUN_DOMAIN: string;
  private readonly client;

  constructor(private readonly config: ConfigService) {
    this.MAILGUN_KEY = this.config.get<string>('MAILGUN_KEY')!;
    this.MAILGUN_DOMAIN = this.config.get<string>('MAILGUN_DOMAIN')!;
  
    const mailgun = new Mailgun(FormData);
    this.client = mailgun.client({
      username: 'api',
      key: this.MAILGUN_KEY,
    });
  }
  

  /**
   * Envio genérico de e-mails via Mailgun API
   */
  async sendMail(data: {
    from: string;
    to: string;
    subject: string;
    html?: string;
    text?: string;
  }) {
    try {
      const res = await this.client.messages.create(this.MAILGUN_DOMAIN, data);
      console.log('Email enviado com sucesso:', res);
      return res;
    } catch (err) {
      console.error('Erro ao enviar email:', err);
      throw new Error('Erro ao enviar email');
    }
  }

  /**
   * Envio de e-mail com nova senha temporária
   */
  async sendNewPasswordEmail(email: string, name: string, password: string) {
    const from = `duduroma2024@gmail.com`;

    const html = `
      <p>Olá ${name},</p>
      <p>Sua nova senha é: <strong>${password}</strong></p>
      <p>Altere sua senha após o login.</p>
      <p>Equipe AmigoStats</p>
    `;

    await this.sendMail({
      from,
      to: email,
      subject: 'Nova senha temporária',
      html,
    });
  }
}
