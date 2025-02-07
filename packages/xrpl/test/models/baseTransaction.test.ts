import { assert } from 'chai'

import { ValidationError } from '../../src'
import { validateBaseTransaction } from '../../src/models/transactions/common'

/**
 * Transaction Verification Testing.
 *
 * Providing runtime verification testing for each specific transaction type.
 */
describe('BaseTransaction', function () {
  it(`Verifies all optional BaseTransaction`, function () {
    const txJson = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      Fee: '12',
      Sequence: 100,
      AccountTxnID: 'DEADBEEF',
      Flags: 15,
      LastLedgerSequence: 1383,
      Memos: [
        {
          Memo: {
            MemoType:
              '687474703a2f2f6578616d706c652e636f6d2f6d656d6f2f67656e65726963',
            MemoData: '72656e74',
          },
        },
        {
          Memo: {
            MemoFormat:
              '687474703a2f2f6578616d706c652e636f6d2f6d656d6f2f67656e65726963',
            MemoData: '72656e74',
          },
        },
        {
          Memo: {
            MemoType: '72656e74',
          },
        },
      ],
      Signers: [
        {
          Signer: {
            Account: 'r....',
            TxnSignature: 'DEADBEEF',
            SigningPubKey: 'hex-string',
          },
        },
      ],
      SourceTag: 31,
      SigningPublicKey:
        '03680DD274EE55594F7244F489CD38CF3A5A1A4657122FB8143E185B2BA043DF36',
      TicketSequence: 10,
      TxnSignature:
        '3045022100C6708538AE5A697895937C758E99A595B57A16393F370F11B8D4C032E80B532002207776A8E85BB9FAF460A92113B9C60F170CD964196B1F084E0DAB65BAEC368B66',
    }

    assert.doesNotThrow(() => validateBaseTransaction(txJson))
  })

  it(`Verifies only required BaseTransaction`, function () {
    const txJson = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
    }

    assert.doesNotThrow(() => validateBaseTransaction(txJson))
  })

  it(`Handles invalid Fee`, function () {
    const invalidFee = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      Fee: 1000,
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidFee),
      ValidationError,
      'BaseTransaction: invalid Fee',
    )
  })

  it(`Handles invalid Sequence`, function () {
    const invalidSeq = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      Sequence: '145',
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidSeq),
      ValidationError,
      'BaseTransaction: invalid Sequence',
    )
  })

  it(`Handles invalid AccountTxnID`, function () {
    const invalidID = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      AccountTxnID: ['WRONG'],
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidID),
      ValidationError,
      'BaseTransaction: invalid AccountTxnID',
    )
  })

  it(`Handles invalid LastLedgerSequence`, function () {
    const invalidLastLedgerSequence = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      LastLedgerSequence: '1000',
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidLastLedgerSequence),
      ValidationError,
      'BaseTransaction: invalid LastLedgerSequence',
    )
  })

  it(`Handles invalid SourceTag`, function () {
    const invalidSourceTag = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      SourceTag: ['ARRAY'],
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidSourceTag),
      ValidationError,
      'BaseTransaction: invalid SourceTag',
    )
  })

  it(`Handles invalid SigningPubKey`, function () {
    const invalidSigningPubKey = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      SigningPubKey: 1000,
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidSigningPubKey),
      ValidationError,
      'BaseTransaction: invalid SigningPubKey',
    )
  })

  it(`Handles invalid TicketSequence`, function () {
    const invalidTicketSequence = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      TicketSequence: '1000',
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidTicketSequence),
      ValidationError,
      'BaseTransaction: invalid TicketSequence',
    )
  })

  it(`Handles invalid TxnSignature`, function () {
    const invalidTxnSignature = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      TxnSignature: 1000,
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidTxnSignature),
      ValidationError,
      'BaseTransaction: invalid TxnSignature',
    )
  })

  it(`Handles invalid Signers`, function () {
    const invalidSigners = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      Signers: [],
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidSigners),
      ValidationError,
      'BaseTransaction: invalid Signers',
    )

    const invalidSigners2 = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      Signers: [
        {
          Signer: {
            Account: 'r....',
          },
        },
      ],
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidSigners2),
      ValidationError,
      'BaseTransaction: invalid Signers',
    )
  })

  it(`Handles invalid Memo`, function () {
    const invalidMemo = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      Memos: [
        {
          Memo: {
            MemoData: 'HI',
            Address: 'WRONG',
          },
        },
      ],
    } as any

    assert.throws(
      () => validateBaseTransaction(invalidMemo),
      ValidationError,
      'BaseTransaction: invalid Memos',
    )
  })

  it(`Handles invalid NetworkID`, function () {
    const invalidNetworkID = {
      Account: 'r97KeayHuEsDwyU1yPBVtMLLoQr79QcRFe',
      TransactionType: 'Payment',
      NetworkID: '1024',
    }
    assert.throws(
      () => validateBaseTransaction(invalidNetworkID),
      ValidationError,
      'BaseTransaction: invalid NetworkID',
    )
  })
})
