<div class="modalBackDrop" ng-click="closeModal()">
    <div class="verticalAlign">
        <div class="list card cardBoxShadowCustom">
            <div class="item item-text-wrap">
                Bank Details:
            </div>
            <div class="dark item item-icon-left">
                <i class="ionicIconSize fa fa-university"></i>
                <span class="currentBalFontSize bankNameWidth currentBalDisplay ellipsis">{{modalBankInfo.bankName}}</span>
                <span class="currentBalFontSize bankAccNoWidth currentBalDisplay ellipsis">{{modalBankInfo.accountNumber}}</span>
            </div>
             <div class="dark item item-icon-left">
                <i class="ionicIconSize fa fa-location-arrow"></i>
                <span class="currentBalFontSize branchTitleWidth currentBalDisplay">Branch: </span>
                <span class="currentBalFontSize branchNameWidth currentBalDisplay">{{modalBankInfo.branchName}}</span>
            </div>
            <div class="dark item item-icon-left">
                <i class="fa fa-credit-card ionicIconSize"></i>
                <span class="bankTypeTitleWidth currentBalDisplay">Bank Type: </span>
                <span class="bankTypeWidth currentBalDisplay">{{modalBankInfo.bankType}}</span>
            </div>
            <div class="dark item item-icon-left">
                <i class="ionicIconSize iconShift fa fa-inr"></i>
                <span class="errorSuccessTextAlign currentBalDisplay currentAmountWidth currentBalFontSize">{{modalBankInfo.currentAmount}}</span>
            </div>
        </div>
    </div>
</div>
