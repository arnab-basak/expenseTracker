<div class="errorSuccessTemplate templateFontSize" ng-if="createUserSuccess===undefined && createUserError !== undefined">
    <i class="assertive ion-information-circled ionicIconSize"></i><span class="errorSuccessTextAlign">&nbsp;&nbsp;{{createUserError}}</span>
</div>
<div class="errorSuccessTemplate" ng-if="createUserSuccess!==undefined && createUserError === undefined">
    <i class="balanced ion-checkmark-circled ionicIconSize"></i><span class="errorSuccessTextAlign">&nbsp;&nbsp;{{createUserSuccess}}</span>
</div>