const express = require('express')
const router = express.Router()

const { listContacts, getContactById, removeContact, addContact, updateContact, favoriteContact } = require('../../controllers/contacts')

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', express.json(), addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', express.json(), updateContact)

router.patch('/:contactId/favorite', express.json(), favoriteContact)

module.exports = router
