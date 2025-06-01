module dropay::dropay;
use sui::coin::{Coin, Self};
use sui::balance::{Balance, Self};
use sui::package::{Self, Publisher};

public struct DROPAY has drop{}

public struct Dropay has key{
    id: UID,
}

const ENotAuthorized: u64 = 0;

fun init(otw: DROPAY, ctx: &mut TxContext) {
    let publisher : Publisher = package::claim(otw, ctx);
    let dropay = Dropay{
        id: object::new(ctx),
    };
    transfer::transfer(dropay, ctx.sender());
    transfer::public_transfer(publisher, ctx.sender());
}
public struct Platform<phantom T> has key, store{
    id: UID,
    platform_address: address,
    fee_percent: u64,
    coin_balance: Balance<T>,
}

public struct Merchant<phantom T> has key, store {
    id: UID,
    merchant_address: address,
    coin_balance: Balance<T>,
}

#[allow(lint(self_transfer))]
public fun init_platform_config<T>(cap: &Publisher, fee_percent: u64, ctx: &mut TxContext) {
    assert!(cap.from_module<Dropay>(), ENotAuthorized);
    assert!(fee_percent <= 100, 1);
    let platform = Platform<T>{
        id: object::new(ctx),
        platform_address: ctx.sender() ,
        fee_percent,
        coin_balance: balance::zero(),
    };
    transfer::public_transfer(platform, ctx.sender());
}

#[allow(lint(self_transfer))]
public fun create_merchant<T>(ctx: &mut TxContext) {
    let merchant = Merchant<T>{
        id: object::new(ctx),
        merchant_address: ctx.sender(),
        coin_balance: balance::zero(),
    };
    transfer::public_transfer(merchant, ctx.sender());
}

public fun pay_merchant<T>(
    // platform_config: &Platform<T>,
    merchant: &mut Merchant<T>,
    coin: Coin<T>,
    // ctx: &mut TxContext
) {
    // let amount = coin.value();
    // let fee_amount = (amount * platform_config.fee_percent) / 100;
    // let merchant_amount = amount - fee_amount;

    // let marchant_coin = coin::take(&mut coin.balance(), merchant_amount, ctx);

    coin::put(&mut merchant.coin_balance, coin);
}

public fun deposit_merchant_balance<T>(merchant: &mut Merchant<T>, coin: Coin<T>) {
    coin::put(&mut merchant.coin_balance, coin);
}