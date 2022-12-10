public without sharing class AccountsQuerySelector {
    public AccountsQuerySelector() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [Select Name From Account LIMIT 10];
    }
}