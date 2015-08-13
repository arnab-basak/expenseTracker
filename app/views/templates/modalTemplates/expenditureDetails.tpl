<div class="modal" ng-click="closeModal()">
    <ion-header-bar>
        <h1 class="title">Confirm Expense:</h1>
    </ion-header-bar>
    <ion-content>
        <div class="list card cardBoxShadowCustom">
            <div class="item item-text-wrap">
                <i class="ionicIconSize fa fa-calendar"></i>
                <span class="currentBalFontSize expenseDateWidth currentBalDisplay ellipsis">{{addExpenseTypeDate}}</span>
            </div>
            <div class="item item-text-wrap">
                <span class="currentBalFontSize expenseTypeWidth currentBalDisplay ellipsis" ng-repeat="data in expenseType track by $index | filter:$index>0">
                    {{data.expenseTypeName}}
                </span>
                <!-- <span class="currentBalFontSize expenseTypeWidth currentBalDisplay ellipsis" ng-repeat="expense in addExpenseTypeData track by $index | filter:$index>0">
                    {{expense}}
                </span> -->
            </div>
            <button class="button button-full button-energized" ng-click="addExpenseToDB()">Done</button>
    </ion-content>
    </div>
