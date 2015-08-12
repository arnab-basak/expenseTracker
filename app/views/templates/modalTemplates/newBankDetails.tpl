<div class="modalBackDrop" ng-click="closeModal()">
    <div class="verticalAlign">
        <div class="list card cardBoxShadowCustom">
            <div class="item item-text-wrap">
                Confirm Bank Details:
            </div>
            <div class="dark item item-icon-left">
                <i class="ionicIconSize fa fa-university"></i>
                <span class="currentBalFontSize bankNameWidth currentBalDisplay ellipsis">{{addBankDetails.bankName}}</span>
                <span class="currentBalFontSize bankAccNoWidth currentBalDisplay">{{addBankDetails.accountNumber}}</span>
            </div>
            <div class="dark item item-icon-left">
                <i class="ionicIconSize fa fa-location-arrow"></i>
                <span class="currentBalFontSize branchTitleWidth currentBalDisplay">Branch: </span>
                <span class="currentBalFontSize branchNameWidth currentBalDisplay">{{addBankDetails.branchName}}</span>
            </div>
            <div class="dark item item-icon-left">
                <i class="fa fa-credit-card ionicIconSize"></i>
                <span class="bankTypeTitleWidth currentBalDisplay">Bank Type: </span>
                <span class="bankTypeWidth currentBalDisplay">{{addBankDetails.bankType}}</span>
            </div>
            <div class="dark item item-icon-left">
                <i class="ionicIconSize iconShift fa fa-inr"></i>
                <span class="errorSuccessTextAlign currentBalDisplay currentAmountWidth currentBalFontSize">{{addBankDetails.currentAmount}}</span>
            </div>
            <div class="row">
                <div class="col">
                    <button class="button button-block button-balanced" ng-click="addNewBankDetailsToDB()">Yes</button>
                </div>
                <div class="col">
                    <button class="button button-block button-assertive" ng-click="closeModal()">No</button>
                </div>
            </div>
        </div>
    </div>
</div>
