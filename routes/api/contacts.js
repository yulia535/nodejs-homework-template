const express = require('express')
const router = express.Router()
const { useAuth } = require('../../middlewares')

const { listContacts, getContactById, removeContact, addContact, updateContact, favoriteContact } = require('../../controllers/contacts')

router.get('/', useAuth, listContacts)

router.get('/:contactId', useAuth, getContactById)

router.post('/', express.json(), useAuth, addContact)

router.delete('/:contactId', useAuth, removeContact)

router.put('/:contactId', express.json(), useAuth, updateContact)

router.patch('/:contactId/favorite', express.json(), useAuth, favoriteContact)

module.exports = router
