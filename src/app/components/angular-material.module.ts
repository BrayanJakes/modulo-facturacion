import { NgModule } from '@angular/core';


import { MatCardModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatBadgeModule,
    MatTooltipModule,
    MatBottomSheetModule,
    MatStepperModule,
    MatTableModule,
    MatDialogModule
} from '@angular/material';


@NgModule({
    imports: [MatCardModule,
        MatProgressBarModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        MatSidenavModule,
        MatBadgeModule,
        MatTooltipModule,
        MatBottomSheetModule,
        MatStepperModule,
        MatTableModule,
        MatDialogModule],

    exports: [MatCardModule,
        MatProgressBarModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSnackBarModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        MatSidenavModule,
        MatBadgeModule,
        MatTooltipModule,
        MatBottomSheetModule,
        MatStepperModule,
        MatTableModule,
        MatDialogModule]
})
export class AngularMaterialModule {

}
