
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

import { VerticalAppHeaderComponent } from './layouts/full/vertical-header/vertical-header.component';
import { VerticalAppSidebarComponent } from './layouts/full/vertical-sidebar/vertical-sidebar.component';
import { HorizontalAppHeaderComponent } from './layouts/full/horizontal-header/horizontal-header.component';
import { HorizontalAppSidebarComponent } from './layouts/full/horizontal-sidebar/horizontal-sidebar.component';

import { AppBreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';


import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthInterceptor } from './authentification/AuthServices/auth.interceptor';
 import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { PosteService } from './core/poste/posteService/poste.service';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RecBullComponent } from './rec-bull/rec-bull.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
    declarations: [
        AppComponent,
        FullComponent,
        VerticalAppHeaderComponent,
        SpinnerComponent,
        AppBlankComponent,
        VerticalAppSidebarComponent,
        AppBreadcrumbComponent,
        HorizontalAppHeaderComponent,
        HorizontalAppSidebarComponent,
        ConfirmationDialogComponent,
        RecBullComponent,
    ],
    imports: [MatFormFieldModule, MatDialogModule, MatInputModule,
      MatAutocompleteModule,
        MatPaginatorModule,
        MatSortModule, MatTableModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        DemoMaterialModule,
        FormsModule,
        FlexLayoutModule,
        PerfectScrollbarModule,
        MatSlideToggleModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forRoot(AppRoutes),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [PosteService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
       ],
    bootstrap: [AppComponent],

})
export class AppModule { }
