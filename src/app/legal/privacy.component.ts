import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SeoService } from '../shared/seo.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterModule],
  template: `
    <main class="legal-page" id="main-content">
      <a class="legal-back" routerLink="/">← Back to Certare</a>
      <p class="legal-eyebrow">LEGAL</p>
      <h1>Aviso de privacidad</h1>
      <p class="legal-updated">Última actualización: {{ legal.lastUpdated }}</p>

      <p>
        <strong>{{ legal.entityName }}</strong>, con domicilio en {{ legal.address }}, es responsable
        del tratamiento de los datos personales que recibe a través de este sitio web y de sus
        formularios de contacto.
      </p>

      <h2>Datos que recopilamos</h2>
      <p>
        Nombre, correo electrónico, empresa, puesto, país, servicio de interés, plazo, rango de
        presupuesto y el mensaje que envías mediante el formulario. También podemos recibir datos
        técnicos básicos del navegador necesarios para operar y proteger el sitio.
      </p>

      <h2>Finalidades del tratamiento</h2>
      <ul>
        <li>Responder tu solicitud y dar seguimiento a la conversación.</li>
        <li>Evaluar si el servicio solicitado encaja con la forma en que trabajamos.</li>
        <li>Preparar una propuesta o acordar el siguiente paso.</li>
        <li>Cumplir obligaciones legales y prevenir uso indebido del sitio.</li>
      </ul>
      <p>No vendemos tus datos ni los utilizamos para publicidad de terceros.</p>

      <h2>Base legal y consentimiento</h2>
      <p>
        El tratamiento se basa en el consentimiento que otorgas al enviar el formulario y en el
        interés legítimo de responder a tu solicitud. Puedes retirar tu consentimiento en cualquier
        momento escribiendo al correo de contacto de este aviso.
      </p>

      <h2>Encargados y transferencias</h2>
      <p>
        Utilizamos proveedores de infraestructura, como Google Firebase y Google Cloud, para alojar
        el sitio y almacenar las solicitudes. No realizamos transferencias a terceros distintos de
        los encargados necesarios para operar el servicio, salvo obligación legal.
      </p>

      <h2>Conservación</h2>
      <p>
        Conservamos las solicitudes durante el tiempo necesario para atenderte y, después, durante
        el plazo que exija la ley o hasta que solicites su eliminación.
      </p>

      <h2>Derechos ARCO</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición, así como
        retirar tu consentimiento, escribiendo a
        <a [href]="'mailto:' + legal.email">{{ legal.email }}</a>. Incluye tu nombre, un medio de
        contacto y la solicitud concreta. Responderemos en los plazos que marca la Ley Federal de
        Protección de Datos Personales en Posesión de los Particulares.
      </p>

      <h2>Cambios a este aviso</h2>
      <p>
        Podemos actualizar este aviso para reflejar cambios en el servicio o en la normativa.
        Publicaremos la versión vigente en esta página con su fecha de actualización.
      </p>
    </main>
  `,
  styles: [`
    .legal-page { max-width: 760px; margin: 0 auto; padding: calc(96px + var(--safe-top)) var(--space-5) var(--space-7); }
    .legal-back { display: inline-flex; align-items: center; min-height: var(--touch-min); font-weight: 700; }
    .legal-eyebrow { margin: var(--space-4) 0 0; color: var(--accent-2); font-size: var(--text-sm); font-weight: 700; letter-spacing: .12em; }
    h1 { font-size: clamp(2rem, 4vw, 3rem); line-height: 1.15; margin: var(--space-3) 0; }
    h2 { font-size: var(--text-xl); margin: var(--space-6) 0 var(--space-2); }
    p, li { line-height: 1.7; }
    ul { padding-left: var(--space-5); color: var(--text-muted); }
    .legal-updated { font-size: var(--text-sm); }
    @media (max-width: 600px) { .legal-page { padding: calc(80px + var(--safe-top)) var(--space-4) calc(96px + var(--safe-bottom)); } }
  `],
})
export class PrivacyComponent implements OnInit {
  readonly legal = environment.legal;

  constructor(private router: Router, private seo: SeoService) {}

  ngOnInit(): void {
    if (!this.legal.entityName || !this.legal.address || !this.legal.email) {
      this.router.navigateByUrl('/', { replaceUrl: true });
      return;
    }
    this.seo.setPage({
      title: 'Aviso de privacidad',
      description: 'Aviso de privacidad de Certare para solicitudes enviadas a través del sitio.',
      path: '/legal/privacy',
    });
  }
}
