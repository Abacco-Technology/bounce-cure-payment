// File: client/src/components/PaymentTable.jsx
import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiEdit2, FiTrash2, FiUser, FiMail, FiCreditCard, FiDollarSign, FiCalendar, FiTag, FiMessageSquare, FiMessageCircle, FiSend, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentTable({ payments, onEdit, onDelete, searchTerm }) {
  const [expanded, setExpanded] = useState(null);

  function toggleExpand(id) {
    setExpanded(expanded === id ? null : id);
  }

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'success' || statusLower === 'succeeded') {
      return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
    } else if (statusLower === 'pending') {
      return 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white';
    } else if (statusLower === 'failed') {
      return 'bg-gradient-to-r from-red-500 to-rose-600 text-white';
    } else {
      return 'bg-gradient-to-r from-gray-500 to-gray-700 text-white';
    }
  };

  // Convert INR to USD (assuming 1 USD = 75 INR for this example)
  const convertToUSD = (amount, currency) => {
    if (currency === 'INR') {
      return (amount / 75).toFixed(2);
    }
    return amount;
  };

  // Filter payments based on search term
  const filteredPayments = payments.filter(payment => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      (payment.name && payment.name.toLowerCase().includes(searchLower)) ||
      (payment.email && payment.email.toLowerCase().includes(searchLower)) ||
      (payment.planName && payment.planName.toLowerCase().includes(searchLower)) ||
      (payment.status && payment.status.toLowerCase().includes(searchLower)) ||
      (payment.id && payment.id.toString().includes(searchLower)) ||
      (payment.userId && payment.userId.toString().includes(searchLower))
    );
  });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Payment Management</h2>
            <p className="text-indigo-200 text-sm mt-1">Manage payment records and transactions</p>
          </div>
          <div className="mt-3 md:mt-0 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <div className="text-white text-sm font-medium">
              {filteredPayments.length} <span className="text-indigo-200">payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {filteredPayments.length === 0 ? (
          <div className="text-center py-10">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center mb-4">
              <FiCreditCard className="text-indigo-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {searchTerm ? "No payments match your search" : "No payments found"}
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              {searchTerm ? "Try adjusting your search criteria" : "There are no payment records available"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPayments.map((p) => {
              const amountInUSD = convertToUSD(p.amount, p.currency);
              const planPriceInUSD = convertToUSD(p.planPrice, p.currency);

              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                >
                  <div className="p-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      {/* User Info Section */}
                      <div className="flex items-start gap-3 sm:w-2/5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <span className="text-white font-semibold text-sm">
                            {p.name ? p.name.charAt(0) : p.email.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                              {p.name}
                            </h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}>
                              {p.status}
                            </span>
                          </div>
                          <div className="flex items-center text-s font-semibold text-gray-700 mb-1">
                            <FiMail className="mr-1" size={14} />
                            <span className="truncate">{p.email}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <FiTag className="mr-1" size={12} />
                            <span className="truncate">{p.planName} • ID: {p.id}</span>
                          </div>
                        </div>
                      </div>

                      {/* Credits Section */}
                      <div className="flex flex-wrap gap-2 sm:w-2/5">
                        <div className="flex items-center bg-blue-50 px-2 py-1 rounded-lg transition-transform group-hover:scale-105">
                          <FiSend className="text-blue-500 mr-1" size={12} />
                          <span className="text-xs font-medium text-blue-700">Email: {p.emailSendCredits}</span>
                        </div>
                        <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg transition-transform group-hover:scale-105">
                          <FiMessageSquare className="text-green-500 mr-1" size={12} />
                          <span className="text-xs font-medium text-green-700">SMS: {p.smsCredits}</span>
                        </div>
                        <div className="flex items-center bg-purple-50 px-2 py-1 rounded-lg transition-transform group-hover:scale-105">
                          <FiMessageCircle className="text-purple-500 mr-1" size={12} />
                          <span className="text-xs font-medium text-purple-700">WA: {p.whatsappCredits}</span>
                        </div>
                        <div className="flex items-center bg-teal-50 px-2 py-1 rounded-lg transition-transform group-hover:scale-105">
                          <FiCheckCircle className="text-teal-500 mr-1" size={12} />
                          <span className="text-xs font-medium text-teal-700">Verify: {p.emailVerificationCredits}</span>
                        </div>
                      </div>

                      {/* Actions Section */}
                      <div className="flex items-center gap-1 sm:w-1/5 sm:justify-end">
                        <button
                          onClick={() => toggleExpand(p.id)}
                          className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          {expanded === p.id ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                        </button>
                        <button
                          onClick={() => onEdit(p)}
                          className="p-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => onDelete(p.id)}
                          className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expanded === p.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-50 border-t border-gray-200"
                      >
                        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <FiDollarSign className="text-indigo-500 mr-2" size={14} />
                            <div>
                              <p className="text-xs text-gray-500">Amount</p>
                              <p className="text-sm font-medium">${amountInUSD} {p.currency !== 'USD' && `(${p.amount} ${p.currency})`}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <FiTag className="text-indigo-500 mr-2" size={14} />
                            <div>
                              <p className="text-xs text-gray-500">Plan Price</p>
                              <p className="text-sm font-medium">${planPriceInUSD} {p.currency !== 'USD' && `(${p.planPrice} ${p.currency})`}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <FiCalendar className="text-indigo-500 mr-2" size={14} />
                            <div>
                              <p className="text-xs text-gray-500">Plan Type</p>
                              <p className="text-sm font-medium">{p.planType}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <FiCreditCard className="text-indigo-500 mr-2" size={14} />
                            <div>
                              <p className="text-xs text-gray-500">Discount</p>
                              <p className="text-sm font-medium">{p.discount}%</p>
                            </div>
                          </div>
                          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <FiUser className="text-indigo-500 mr-2" size={14} />
                            <div>
                              <p className="text-xs text-gray-500">Provider</p>
                              <p className="text-sm font-medium">{p.provider}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <FiCreditCard className="text-indigo-500 mr-2" size={14} />
                            <div>
                              <p className="text-xs text-gray-500">Transaction ID</p>
                              <p className="text-sm font-medium truncate">{p.transactionId}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
                            <FiCreditCard className="text-indigo-500 mr-2" size={14} />
                            <div>
                              <p className="text-xs text-gray-500">Invoice ID</p>
                              <p className="text-sm font-medium truncate">{p.customInvoiceId}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}