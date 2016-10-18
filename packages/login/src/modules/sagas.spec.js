import {put, select, call} from 'redux-saga/effects'
import * as sagas from './sagas'
import {ExternalEvents} from 'tocco-util'
import {changePage} from './login/actions'
import {setMessage, setPending} from './loginForm/actions'
import {setRequestedCode} from './twoStepLogin/actions'
import {Pages} from '../types/Pages'

describe('login', () => {
  describe('modules', () => {
    describe('sagas', () => {
      it('loginSaga: handle successfully login', () => {
        const gen = sagas.loginSaga({payload: {}})
        expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
        expect(gen.next(new Response()).value).to.eql(call(sagas.getBody, new Response()))
        const body = {success: true}
        expect(gen.next(body).value).to.eql(call(sagas.handleSuccessfulLogin, body))
        expect(gen.next().value).to.eql(put(setPending(false)))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('loginSaga: handle unsuccessful login', () => {
        const gen = sagas.loginSaga({payload: {}})
        expect(gen.next().value).to.eql(call(sagas.doLoginRequest, {}))
        expect(gen.next(new Response()).value).to.eql(call(sagas.getBody, new Response()))
        const body = {success: false}
        expect(gen.next(body).value).to.deep.equal(put(changePage(Pages.LOGIN_FORM)))
        expect(gen.next(new Response()).value).to.eql(call(sagas.handleFailedResponse, body))
        expect(gen.next().value).to.eql(put(setPending(false)))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handleSuccessfulLogin: should call external event with timeout of reponse body', () => {
        const gen = sagas.handleSuccessfulLogin({timeout: 33})
        expect(gen.next().value).to.eql(call(ExternalEvents.invokeExternalEvent, 'successfullyLogin', {timeout: 33}))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handleSuccessfulLogin: should call external event with default timeout if none in body', () => {
        const gen = sagas.handleSuccessfulLogin({})
        expect(gen.next().value).to.eql(call(ExternalEvents.invokeExternalEvent, 'successfullyLogin', {timeout: sagas.DEFAULT_TIMEOUT}))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handleTwoStepLoginResponse: should dispatch actions `setRequestedCode` and `changePage`', () => {
        const gen = sagas.handleTwoStepLoginResponse({
          REQUESTEDCODE: 'code'
        })
        expect(gen.next().value).to.deep.equal(put(setRequestedCode('code')))
        expect(gen.next().value).to.deep.equal(put(changePage('TWOSTEPLOGIN')))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handlePasswordUpdateResponse: should dispatch action changePage', () => {
        const gen = sagas.handlePasswordUpdateResponse({})
        expect(gen.next().value).to.deep.equal(put(changePage('PASSWORD_UPDATE')))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handleOneTilLBlockResponse: should dispatch action setMessage', () => {
        const gen = sagas.handleOneTilLBlockResponse({})
        expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector))
        expect(gen.next({'client.login.form.lastTry': 'msg'}).value).to.deep.equal(put(setMessage('msg', true)))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handleBlockResponse: should dispatch action setMessage', () => {
        const gen = sagas.handleBlockResponse({})
        expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector))
        expect(gen.next({'client.login.form.blocked': 'msg'}).value).to.deep.equal(put(setMessage('msg', true)))
        expect(gen.next().done).to.deep.equal(true)
      })

      it('handleFailedResponse: should dispatch action setMessage', () => {
        const gen = sagas.handleFailedResponse({})
        expect(gen.next().value).to.deep.equal(select(sagas.textResourceSelector))
        expect(gen.next({'client.login.form.failed': 'msg'}).value).to.deep.equal(put(setMessage('msg', true)))
        expect(gen.next().done).to.deep.equal(true)
      })
    })
  })
})
