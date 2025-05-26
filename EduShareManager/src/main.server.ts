import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
// import { provideAnimations } from '@angular/platform-browser/animations';

const bootstrap = () => bootstrapApplication(AppComponent, config);
// const bootstrap = () => {
//  bootstrapApplication(AppComponent, {
//   providers: [provideAnimations()] // 👈 זה מה שצריך
// });
// };
export default bootstrap;
